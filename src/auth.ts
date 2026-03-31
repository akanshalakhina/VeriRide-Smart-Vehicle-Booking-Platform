/* Authentication means who r u and authorization is what can u do ? */
import { connect } from "http2";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectToDB from "./lib/db";
import bcrypt from "bcryptjs";
import User from "./models/user.model";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    //credentials and google procider
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },//authorize function return user
      async authorize(credentials, request) {
        if(!credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }
        const email = credentials.email;
        const password = credentials.password as string;
        await connectToDB();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with the email");
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid password");
        }
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        };
      },
    })
  ],
})
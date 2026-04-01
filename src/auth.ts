/* Authentication means who r u and authorization is what can u do ? */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
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
      }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ], //callbacks are used to control what happens when a user signs in or out, or when a session is created or updated. We can use callbacks to add custom logic to these events, such as checking if a user has the correct role to access a certain page or resource.
  //cookies contain session id which is unique identifier for login session
  //“Cookies store small data in browser, sessions store user data on server using a session ID, and tokens (JWT) store authentication data on the client for stateless authentication.”
  callbacks: {
    async signIn({user, account}) {
      await connectToDB();
      let dbUser=await User.findOne({email:user.email});
      if(account?.provider=="google"){
        if(!dbUser){
          await User.create({
            name:user.name,
            email:user.email,
            role:"user",
  
          })
          dbUser=await User.findOne({email:user.email});
        }
        
      }
      if(dbUser){
        user.id=dbUser._id
        user.role=dbUser.role
      }
      return true;
    },
      // Custom logic for sign-in
    },
    async jwt({ token, user }: { token: any; user: any }) {
      token.name = user.name;
      token.id = user.id;
      token.email = user.email;
      token.role = user.role;
      
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
    if(session.user){
      session.user.name = token.name;
      session.user.email= token.email;
      session.user.role= token.role;
      session.user.id= token.id;
    }
      return session;
    }
  },
  //session is accessed in frontend ..session tells which current user is logged in
  pages:{
    signIn:"/signin",
    error:"/signin" //error page is also signin page
    
  },
  session: {
    strategy:"jwt", //use jwt for session management  
    maxAge : 10 * 24 * 60 * 60, // 1 day in seconds
  },
  secret: process.env.NEXTAUTH_SECRET, //secret key for encrypting session data

});
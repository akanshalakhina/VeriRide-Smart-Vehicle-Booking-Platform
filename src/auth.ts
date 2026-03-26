import { connect } from "http2"
import NextAuth from "next-auth"
import Credentials, { CredentialInput, CredentialsConfig } from "next-auth/providers/credentials"
import connectToDB from "./lib/db"
import credentials from "next-auth/providers/credentials"
import User from "./models/user.model"
import { request } from "http"
import email from "next-auth/providers/email"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
  },
},
  async authorize(credentials, request) {
          if(: any!credentials: any.email || !credentials.password) {
             throw Error("missing_credentials")
            }
            const email=credentials.email;
            const password=credentials.password;
            await connectToDB()
            const user=await User.findOne({email})
            if (: any!user: any) {
                throw Error("user doesnt exist!")
            }
            
    
    // Here you would typically fetch the user
    //  from your database
    },
})
    ],
})

function authorize(credentials: <CredentialsInputs extends Record<string, CredentialInput> = Record<string, CredentialInput>>(config: Partial<CredentialsConfig<CredentialsInputs>>) => CredentialsConfig, request: any): any {
    throw new Error("Function not implemented.")
}

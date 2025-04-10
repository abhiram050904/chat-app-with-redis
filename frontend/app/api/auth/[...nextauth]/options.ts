import { LOGIN_URL } from "@/lib/apiEndPoints";
import axios from "axios";
import { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export interface CustomSession{
    user?:CustomUser;
    expires:ISODateString
}

export interface CustomUser{
    id?:string|null
    name?:string|null
    email?:string|null
    image?:string|null
    provider?:string|null
    token?:string|null
}

export const authOptions:AuthOptions={
    pages:{
        signIn:'/'
    },
    callbacks:{

        async signIn({ user, account}:{user:CustomUser,account:Account |null}) {
           try{
            console.log('user data is',user)
            console.log('the account is',account)
            const payload={
                email:user.email,
                name:user.name,
                oauth_id:account?.providerAccountId,
                provider:account?.provider,
                image:user.image
            }

            console.log("Login URL:", LOGIN_URL);

            const {data}=await axios.post(LOGIN_URL,payload,{ headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            withCredentials: true})
            console.log("data from backend is",data)
            user.id=data?.user?.id.toString()
            user.token=data?.user?.token
            user.provider=data?.user?.provider
            return true
           }
           catch (err) {
            console.error("Login API error:", err);
            return false;
        }

          },

        async session({ session, user, token }:{session:CustomSession,user:CustomUser,token:JWT}) {
            session.user=token.user as CustomUser
            return session
          },
        async jwt({ token, user}) {
            if(user){
                token.user=user
            }
            return token
          }

    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "openid email profile",
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
              }
          })
    ]
}
import { connectDB } from "@/config/connectDB";
import userModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions:NextAuthOptions ={
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials){
                if(!credentials?.email ||!credentials.password){
                    throw new Error("Email and Password is missing")
                }
                try{
                    await connectDB();
                    const user=await userModel.findOne({email:credentials.email})
                    if(!user){
                        throw new Error("No user Found With This Email.")
                    }
                    const isValidPassword=await bcrypt.compare(credentials.password,user.password);
                    if(!isValidPassword){
                        throw new Error("Provide Wrong Password.")
                    }
                    return {
                        id:user._id.toString(),
                        email:user.email,
                        image:user.picture || "",
                        name:user.name
                    }
                }catch(error){
                    throw error;
                    
                }
            }
            
        })

    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id=user.id
            }
            return token
        },
        async session({session,token}){
            if(session.user){
                session.user.id=token.id as string
            }
            return session;
        }
    },
    pages:{
        signIn:'/login',
        error:'/login'
    },
    session:{
        strategy:'jwt',
        maxAge:30*24*60*60
    },
    secret:process.env.NEXTAUTH_SECRET
}

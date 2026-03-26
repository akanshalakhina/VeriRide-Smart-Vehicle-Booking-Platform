import connectToDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    let name, email, password, user;
    try{
        ({name,email,password}=await req.json())
        await connectToDB() //connect to database
        user=await User.findOne({email})
        if(user){
            return NextResponse.json({message:"User already exists"}, {status:400})
        }
        if(password.length<6){
            return NextResponse.json({message:"Password must be at least 6 characters long"}, {status:400})
        }
        const hashedPassword=await bcrypt.hash(password,10) //hash the password
        user=await User.create({name,email,password:hashedPassword})
        return NextResponse.json({message:"User registered successfully"}, {status:201})
    }
    catch(error){
         console.error("REGISTER ERROR:", error)
        return NextResponse.json({message:`register error ${error} `}, {status:500})
        
    }
}
/*1. Get data from request
2. Connect DB
3. Check if user exists
4. Hash password
5. Save user
6. Return response
I created a POST API route where I first extract user data, connect to MongoDB, check for existing users, hash the password using bcrypt, and then store the user securely.”*/


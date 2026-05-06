import connectToDB from "@/lib/db";
import { sendMail } from "@/lib/sendMail";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let name, email, password, user;
    try {
        ({ name, email, password } = await req.json())
        await connectToDB() //connect to database
       let user = await User.findOne({ email })
        if (user && user.isEmailVerified) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString() //generate 6 digit otp
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000) //otp expires in 10 minutes
        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10) //hash the password
        if(user && !user.isEmailVerified){
            user.name = name,
            user.email = email,
            user.otp = otp,
            user.otpExpiresAt = otpExpiresAt //otp expires in 10 minutes
            user.password = hashedPassword
           await user.save()
        }
       else{ //if user does not exist, create a new user
         user = await User.create({ 
            name, email, password: hashedPassword 
        ,otp, otpExpiresAt 
    })

       }
       await sendMail(
        email,"Verify your email for VeriRide",
        `<h2>Your OTP for email verification is ${otp}</h2><p>This OTP is valid for 10 minutes.</p>`,
        `Your OTP for email verification is ${otp}. This OTP is valid for 10 minutes.`
       )

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
    }
    catch (error) {
        console.error("REGISTER ERROR:", error)
        return NextResponse.json({ message: `register error ${error} ` }, { status: 500 })

    }
}
/*1. Get data from request
2. Connect DB
3. Check if user exists
4. Hash password
5. Save user
6. Return response
I created a POST API route where I first extract user data, connect to MongoDB, check for existing users, hash the password using bcrypt, and then store the user securely.”*/


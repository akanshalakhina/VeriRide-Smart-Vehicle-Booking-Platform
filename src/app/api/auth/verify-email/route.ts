import connectToDB from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function POST(req: Request) {
    try {
        await connectToDB(); //connect to database
        const { email, otp } = await req.json(); //get email and otp from request body
        if (!email && !otp) {
            return Response.json(
                { message: "Email and OTP are required" },
                { status: 400 },
            );
        }
        let user = await User.findOne({ email });
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }
        if (user.isEmailVerified) {
            return Response.json({ message: "Email already verified" }, { status: 200 });
        }
         if(!user.otpExpuresAt || user.otpExpiresAt < new Date()){
            return Response.json(
                {message:"OTP has expired. Please request a new one."}, 
                {status:400}
            )
          }
          if(!user.otp || user.otp !== otp ){
            return Response.json(
                {message:"Invalid OTP."}, 
                {status:400}
            )
          }
          user.isEmailVerified = true;
          user.otp = undefined;
          user.otpExpiresAt = undefined; //clear otp and expiry time after successful verification
          await user.save(); //save the updated user
            return Response.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error) { 
        return Response.json({ message: `Email verification error: ${error}` }, { status: 500 });
    }
}

import mongoose, {Document, Mongoose} from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password?: string; //password is optional
    role:"user" | "partner" | "admin"
    isEmailVerified?:boolean //email verification is optional  
    otp?:string, //otp for email verification
    otpExpiresAt?:Date //otp expiry time
    createdAt:Date;
    updatedAt:Date;


}
const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String, //schema S should be capital
        required: true,
    },
    email: {    
        type: String,
        required: true,
        unique: true, //email should be unique
    },
    password: {
        type: String,
    },
    role:{
        type: String,
        default: "user",
        enum: ["user", "partner", "admin"]
    },
    isEmailVerified:{
        type: Boolean,
        default: false
    },
    otp:{
        type: String,
    },
    otpExpiresAt:{
        type: Date,
    }

},{timestamps:true}); //created and update fields will be formed

const User=mongoose.models.User || mongoose.model("User",userSchema)
export default User
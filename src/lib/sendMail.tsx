import nodemailer from "nodemailer";

//Nodemailer = “send email using code”
const transporter =nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})
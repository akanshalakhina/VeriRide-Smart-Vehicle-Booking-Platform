import nodemailer from "nodemailer";

//Nodemailer = “send email using code”
const transporter =nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})
//sendMail function takes email, subject and text as parameters and sends an email using the transporter created above. It returns a promise that resolves when the email is sent successfully or rejects if there is an error.
export const sendMail =async(to:string,subject:string,text:string,html:string)=>{
    await transporter.sendMail({
       from:`VERIRIDE <${process.env.EMAIL_USER}>`,
        to, 
        subject,
        text,
        html
    })
 
   

}
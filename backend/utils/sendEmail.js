import nodemailer from 'nodemailer';

export const sendEmail=async(to,otp)=>{
    try{
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
    }
})
await transporter.sendMail({
    from:process.env.EMAIL_USER,
    to:to,
    subject: "Your OTP Code",
     html: `
        <h2>Your OTP is: ${otp}</h2>
        <p>This OTP will expire in 5 minutes.</p>
        `
});
console.log("OTP Email sent successfully");
    }
    catch(error){
 console.error("Email sending failed:", error);
 throw error;
    }
}

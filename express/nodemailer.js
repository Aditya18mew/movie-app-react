
const nodemailer=require("nodemailer")
require("dotenv")



async function sendotpemail(email,otp){
    try{

        let transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_ADMIN,
                pass:process.env.EMAIL_APP_PASS
            }
        
        })

const message={
    from:"aditionly18@gmail.com",
    to:email,
    subject:"OTP for sign-up",
   html: `
        <p>OTP:${otp}</p>
        `,
    text:"This OTP will expire in 10 minutes"        
}
    transporter.sendMail(message,(error,info)=>{
    if(error){
        return true
    }
    console.log(`Email sent:`, info.response)
    return false
   })

    }catch(err){
        console.log(err)
    }
   
 }




 async function sendresetotpemail(email,otp){
    try{
        let transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_ADMIN,
                pass:process.env.EMAIL_APP_PASS
            }
        
        })

        let resetlink=`http://localhost:5173/resetpassword?token=${token}`



const message={
    from:"aditionly18@gmail.com",
    to:email,
    subject:"Reset Password",
   html: `
        <p><p>OTP:${otp}</p></p>
        `,
    text:"This OTP will expire in 10 minutes"        
}
    transporter.sendMail(message,(error,info)=>{
    if(error){
        return true
    }
    console.log(`Email sent:`, info.response)
    return false
   })

    }catch(err){
        console.log(err)
    }
   
 }




 module.exports={sendotpemail,sendresetotpemail}


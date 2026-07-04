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
    from:process.env.EMAIL_ADMIN,
    to:email,
    subject:"OTP for sign-up",
   html: `
        <p>OTP:${otp}</p>
        `,
    text:"This OTP will expire in 10 minutes"        
}


  const info= await transporter.sendMail(message)

    }catch(err){
        console.error(err)
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
    return false
   })

    }catch(err){
        console.error(err)
        return true
    }
   
 }




 module.exports={sendotpemail,sendresetotpemail}


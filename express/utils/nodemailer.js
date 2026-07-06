const nodemailer=require("nodemailer")
require("dotenv")


 const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_ADMIN,
                pass:process.env.EMAIL_APP_PASS
            }
        
        })

 async function sendotpemail(email,otp){
    try{      
   await transporter.sendMail({
        from:process.env.EMAIL_ADMIN,
        to:email,
        subject:"OTP for sign-up",
        html: `
              <p>OTP:${otp}</p>
              `,
        text:"This OTP will expire in 10 minutes"        
     })
     return {success:true}
    }catch(err){
     console.error(err)
     return {success:false}
    }  
 }


 async function sendresetotpemail(email,otp){
    try{
   await transporter.sendMail({
             from:"aditionly18@gmail.com",
             to:email,
             subject:"Reset Password",
             html: `
                   <p><p>OTP:${otp}</p></p>
                   `,
             text:"This OTP will expire in 10 minutes"        
        })
        return {success:true}
    }catch(err){
        console.error(err)
        return {success:false}
    }
}




 module.exports={sendotpemail,sendresetotpemail}


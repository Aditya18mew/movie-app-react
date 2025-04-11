const { tr } = require("date-fns/locale")
const { text } = require("express")
const nodemailer=require("nodemailer")
require("dotenv")



 async function sendresetpasswordemail(email,token){
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
        <p>click the link given below to reset your password</p>
        <a href="${resetlink}">here</a>
        `,
    text:"This link will expire in 10 minutes"        
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




 module.exports={sendresetpasswordemail}


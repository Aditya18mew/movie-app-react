const bcrypt=require("bcrypt")
const {unverifiedUser}=require("./mongoosedb")
const {generatejwt}=require("./jwttokens")
const {sendotpemail}=require("./nodemailer")
const {randomInt}=require("crypto")





async function bcrypting(email,password){
    try{
       const hasspassword=await bcrypt.hash(password,10)
       const otp=randomInt(100000,999999).toString()
       const newuser=new unverifiedUser({
        Email:email,
        Password:hasspassword,
        otp:otp
       }) 

       await newuser.save()
       await sendotpemail(email,otp)
       return {success:true}
    }catch(err){
        console.log(err)
    }
}


async function comparehashpassword(email,password,hashpassword){
    try{
     const passwordmatch=await bcrypt.compare(password,hashpassword)
     if(!passwordmatch){
        return {passwordmatch:false,accesstoken:null}
     }
     const {AccessToken,RefreshToken}=await generatejwt(email)
     return {passwordmatch,AccessToken,RefreshToken}
    }catch(err){
        console.log(err)
    }
}


module.exports={bcrypting,comparehashpassword}
const bcrypt=require("bcrypt")
const {User}=require("./mongoosedb")
const {generatejwt}=require("./jwttokens")
const {sendotpemail}=require("./nodemailer")
const {randomInt}=require("crypto")





async function bcrypting(email,password){
    try{
       const hasspassword=await bcrypt.hash(password,10)
       const otp=randomInt(100000,999999).toString()
       const newuser=new User({
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
     const accesstoken=await generatejwt(email)
     return {passwordmatch,accesstoken}
    }catch(err){
        console.log(err)
    }
}


module.exports={bcrypting,comparehashpassword}
const bcrypt=require("bcrypt")
const {unverifiedUser,User}=require("./mongoosedb")
const {generatejwt}=require("./jwttokens")
const {sendotpemail}=require("./nodemailer")
const {randomInt}=require("crypto")
const crypto=require("crypto")


function hashotp(otp){ 
 return crypto.createHash("sha256").update(otp).digest("hex")
}


async function registerUser(email,password){
    try{
       const hasspassword=await bcrypt.hash(password,10)
       const num=randomInt(100000,999999).toString()
       const otp=hashotp(num)

       const newuser=new unverifiedUser({
        email:email,
        password:hasspassword,
        otp:otp,
        otpCreatedAt:new Date()
       }) 

       await newuser.save()
       await sendotpemail(email,num)
       return {success:true}
    }catch(err){
        console.log(err)
    }
}


async function loginUser(email,password,hashpassword){
    try{
     const match=await bcrypt.compare(password,hashpassword)
     if(!match)  return {success:false,reason:"invalid_credentials",Accesstoken:null,RefreshToken:null}
     const {AccessToken,RefreshToken}=await generatejwt(email)
     return {success:true,reason:null,AccessToken,RefreshToken}
    }catch(err){
        console.error(err.message)
        return {success:false,reason:"server error",Accesstoken:null,RefreshToken:null}
    }
}

async function verifyotp(email,otp){
    try{
     const user=await unverifiedUser.findOne({email:email})
     if(user.otp!==hashotp(otp))  return {success:false,reason:"invalid otp",AccessToken:null,RefreshToken:null};
     const OTP_EXPIRY=10*60*1000
     if(Date.now()-user.otpCreatedAt.getTime()>OTP_EXPIRY) return {success:false,reason:"otp expired",AccessToken:null,RefreshToken:null};

    const newuser=new User({
        email:user.email,
        password:user.password,
       })
       await newuser.save()
       await unverifiedUser.findByIdAndDelete(user._id)

    const {AccessToken,RefreshToken}=await generatejwt(email)
        return {success:true,reason:null,AccessToken:AccessToken,RefreshToken:RefreshToken};
    }catch(err){
        console.error(err)
       return {success:false,reason:"server error",AccessToken:null,RefreshToken:null};
    }
}


module.exports={registerUser,loginUser,verifyotp}
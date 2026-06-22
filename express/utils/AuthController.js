const bcrypt=require("bcrypt")
const {unverifiedUser,User}=require("./mongoosedb")
const {generatejwt}=require("./jwttokens")
const {sendotpemail}=require("./nodemailer")
const {randomInt}=require("crypto")





async function registerUser(email,password){
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
     const user=await unverifiedUser.findOne({"Email":email})
     if(user.otp===otp){
         const newuser=new User({
        Email:user.Email,
        Password:user.Password,
       })
       await newuser.save()
       await unverifiedUser.findByIdAndDelete(user._id)
  const {AccessToken,RefreshToken}=await generatejwt(email)
        return {success:true,AccessToken:AccessToken,RefreshToken:RefreshToken};
     }else{
        return {success:false,AccessToken:null,RefreshToken:null};
     }
    }catch(err){
        console.log(err)
    }
}


module.exports={registerUser,loginUser,verifyotp}
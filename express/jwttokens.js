const jwt=require("jsonwebtoken")
const {User}=require("./mongoosedb")


require("dotenv").config()
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET

async function generatejwt(email){

    const user=await User.findOne({Email:email})

    const AccessToken=jwt.sign({
        id:user._id,
        Email:user.Email
    },ACCESS_TOKEN_SECRET,{expiresIn:"15m"})

    const RefreshToken=jwt.sign({
        id:user._id,
        Email:user.Email
    },REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
     
     user.otp=""
     user.RefreshToken=RefreshToken
     user.CreatedAt=Date.now()
     user.ExpiredAt=Date.now() + 7*24*60*60

       await user.save()

   
return {AccessToken,RefreshToken}
}





async function generateresetjwt(email){

      const User= await User.findOne({Email:email})

      const resetToken=jwt.sign({
        id:User._id,
        Email:User.Email
      },RESET_TOKEN_SECRET,{expiresIn:"10m"})

    User.ResetToken=resetToken
    User.TokenExpiry=new Date(Date.now()+10*60*1000)
    await User.save()

    return resetToken

}

async function checkresettoken(token){ 
try{
  let decodedEmail=jwt.verify(token,process.env.RESET_TOKEN_SECRET).Email
  let foundUser=await User.findOne({Email:decodedEmail})
if(!foundUser){
  return false
}else{
  if(foundUser.TokenExpiry<Date.now() || foundUser.ResetToken!==token){
    return false
  }else{
    return foundUser
  }
}
}catch(err){
  console.log(err)
}
}



module.exports={generatejwt,generateresetjwt,checkresettoken}
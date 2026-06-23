const jwt=require("jsonwebtoken")
const {User}=require("./mongoosedb")
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


       await user.save()

   
return {AccessToken,RefreshToken}
}



module.exports={generatejwt}
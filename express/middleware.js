const jwt=require("jsonwebtoken")
require("dotenv").config()
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET

const verifyUser=(req,res,next)=>{
    const AccessToken=req.cookies.MovieappAccessToken
try {
if(!AccessToken){
const RefreshToken=req.cookies.MovieappRefreshToken
console.log(RefreshToken)
if(!RefreshToken){
    return res.status(401).json({success:false,message:"UnAuthorized:No token provided"})
}
  const decoded=jwt.verify(RefreshToken,REFRESH_TOKEN_SECRET)
  console.log(decoded)
  const newAccessToken=jwt.sign({
          id:decoded._id,
          Email:decoded.Email
      },ACCESS_TOKEN_SECRET,{expiresIn:"15m"})

 const newRefreshToken=jwt.sign({
           id:user._id,
           Email:user.Email
       },REFRESH_TOKEN_SECRET,{expiresIn:"7d"}) 

        res.cookie("MovieappRefreshToken",newRefreshToken,{
        maxAge:60*60*24*7,
        path:"/",
        secure:false,
        httpOnly:true,
        sameSite:"lax"
     })  
    
    res.cookie("MovieappAccessToken",newAccessToken,{
        maxAge:15*60*60,
        path:"/",
        secure:false,
        httpOnly:true,
        sameSite:"lax"
     })
     req.user=decoded   
    return next()
}else{
    const decoded=jwt.verify(AccessToken,ACCESS_TOKEN_SECRET)
    req.user=decoded   
    return next()
}
} catch (error) {
    if(error.name==="TokenExpiredError"){
         return res.status(401).json({success:false,message:"Token expired"})
    }
    return res.status(403).json({success:false,message:"Invalid Token"})
}

}

module.exports={verifyUser}
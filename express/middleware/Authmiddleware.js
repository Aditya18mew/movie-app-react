const jwt=require("jsonwebtoken")
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET
const isproduction=process.env.NODE_ENV==="production"


const verifyUser=(req,res,next)=>{
    if(req.user){
        return next()
    }
   const AccessToken=req.cookies.MovieappAccessToken
if(!AccessToken){
  return res.status(401).json({success:false,message:"UnAuthorized:No token provided"})
}
try {
 const decoded=jwt.verify(AccessToken,ACCESS_TOKEN_SECRET)
 req.user=decoded   
    next()
}catch (error) {
  console.error(error)
    if(error.name==="TokenExpiredError"){
         return res.status(401).json({success:false,message:"Token expired"})
    }
    return res.status(403).json({success:false,message:"Invalid Token"})
}
}




const refreshtokens=(req,res,next)=>{
   const AccessToken=req.cookies.MovieappAccessToken
   if(AccessToken){
    return next()
   }

     const RefreshToken=req.cookies.MovieappRefreshToken
   if(!RefreshToken)  return res.status(200).json({success:false,message:"UnAuthorized:No token provided"})

   try{
  const decoded=jwt.verify(RefreshToken,REFRESH_TOKEN_SECRET)

  const newAccessToken=jwt.sign({
          id:decoded._id,
          Email:decoded.Email
      },ACCESS_TOKEN_SECRET,{expiresIn:"15m"})

 const newRefreshToken=jwt.sign({
           id:decoded._id,
           Email:decoded.Email
       },REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
       
        
         res.cookie("MovieappAccessToken",newAccessToken,{
        maxAge:15*60*1000,
        path:"/",
        secure:isproduction,
        httpOnly:true,
        sameSite:isproduction ? "none":"lax"
     })

        res.cookie("MovieappRefreshToken",newRefreshToken,{
        maxAge:7*60*60*24*1000,
        path:"/",
        secure:isproduction,
        httpOnly:true,
        sameSite:isproduction ? "none":"lax"
     })  
     req.user={id:decoded._id,email:decoded.Email}
     req.tokenRefreshed=true;
     next()
   }catch(err){
    console.error(err)
       if(err.name==="TokenExpiredError"){
         return res.status(401).json({success:false,message:"Token expired"})
    }
         return res.status(403).json({success:false,message:"Invalid Token"})
   }
}



const logout= async (req,res,next)=>{
   const MovieappRefreshToken=req.cookies.MovieappRefreshToken
        if(!MovieappRefreshToken){
            return res.status(401).json({success:false,message:"Unauthorized:No token provided"})
        }
       try{
         res.clearCookie("MovieappAccessToken")
        res.clearCookie("MovieappRefreshToken")
         return res.status(200).json({success:true,message:"logout successful"})
       }catch(err){
        console.error(err)
        return res.status(500).json({success:false,message:"logout unsuccessful"})
     }
}

module.exports={verifyUser,refreshtokens,logout}
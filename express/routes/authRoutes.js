const express=require("express")
const {User}=require("../utils/mongoosedb")
const {validatemail,validatepassword}=require("../regex/regex")
const {registerUser,loginUser,verifyotp}=require("../utils/AuthController")
const bcrypt=require("bcrypt")
const {sendresetotpemail}=require("../utils/nodemailer")
const isproduction=process.env.NODE_ENV==="production"
const {randomInt}=require("crypto")
const {logout}=require("../middleware/Authmiddleware")
const { authLimiter } = require("../middleware/ratelimiter")
const crypto=require("crypto")


function hashotp(otp){ 
 return crypto.createHash("sha256").update(otp).digest("hex")
}



const router=express.Router();


router.post("/signup",authLimiter,async (req,res)=>{
    try{
    const {email,password}=req.body
    if(!validatemail(email))  return res.status(401).json({success:false,message:"invalid email"})
    if(!validatepassword(password))   return res.json({success:false,message:"8 characters,1 uppercase or lowercase and 1 digit"})

    const olduser=await User.findOne({email:email})
    if(!olduser){
   const {success}=await registerUser(email,password)
    return res.status(201).json({success:success,message:"check mail"})
}else{
    return res.status(409).json({success:false,message:`already in use`})
}
}catch(err){
    console.error(err)
    return res.status(500).json({success:false,message:"signup failed try again"})
}
})

router.post("/verifyotp",async (req,res)=>{
    try{
       const {email,otp}=req.body
     const {success,reason,AccessToken,RefreshToken}=await verifyotp(email,otp)
     if(success){
     res.cookie("MovieappAccessToken",AccessToken,{
        maxAge:15*60*1000,
        path:"/",
        secure:isproduction,
        httpOnly:true,
        sameSite:"lax"
     })
     res.cookie("MovieappRefreshToken",RefreshToken,{
        maxAge:7*24*60*60*1000,
        path:"/",
        secure:isproduction,
        httpOnly:true,
        sameSite:"lax"
     })
      return res.status(200).json({success:true,message:"sign-up successful"})
     }else{
        if(reason==="invalid otp")  return res.json({success:false,message:"Incorrect otp"})
        if(reason==="otp expired")  return res.json({success:false,message:"otp expired"})
         return res.json({success:false,message:"server error"})   
     }
    }catch(err){
        console.error(err)
        return res.status(500).json({success:false,message:"server error try again"})
    }
})

router.post("/signin",authLimiter,async (req,res)=>{
        const {email,password}=req.body

     if(!validatemail(email))  return res.status(401).json({success:false,message:"Email format is incorrect"})
     if(!validatepassword(password))  return res.json({success:false,message:"Password must have 8 characters including 1 uppercase or lowercase alphabet and 1 digit"})
     try{
         const olduser=await User.findOne({email:email})

      if(!olduser)  return res.status(401).json({success:false,message:"Invalid Email"})

        const  {success,reason,AccessToken,RefreshToken}= await loginUser(email,password,olduser.password)
          
        if(success){
             res.cookie("MovieappAccessToken",AccessToken,{
            maxAge:15*60*1000,
            path:"/",
            secure:isproduction,
            httpOnly:true,
            sameSite:"lax"
        })
        res.cookie("MovieappRefreshToken",RefreshToken,{
            maxAge:7*24*60*60*1000,
            path:"/",
            secure:isproduction,
            httpOnly:true,
            sameSite:"lax"
        })
        return res.status(200).json({success:true,message:"login succesful"})
         }else{
            if(reason==="invalid_credentials") return res.status(401).json({success:false,message:"Incorrect password"})
                return res.status(500).json({success:false,message:"Login failed please try again"})
         }
    }catch(err){
        console.error(err)
         return res.status(500).json({success:false,message:"Login failed please try again"})
    }
    })


 router.post("/logout", logout)


 router.post("/forgetpassword",async (req,res)=>{
      const {email}=req.body
      if(!validatemail)  return res.json({success:false,message:"invalid email"})
      try{
        
         const user=await User.findOne({email:email})
          if(!user)  return res.json({success:false,message:"invalid email"})
             
             const num=randomInt(100000,999999).toString()
             const otp=hashotp(num)
             user.otp=otp
             user.otpCreatedAt=new Date()
             await user.save()
             const iserror=await sendresetotpemail(email,num)
          if(iserror){
             res.json({success:false,message:"Unable to send a email"})
          }else{
            res.json({success:true,message:`Email with a reset otp has been sent`})
          }
     }catch(err){
           console.error(err)
           return res.status(500).json({success:false,message:"reset failed"})
     }   
     })


   router.post("/verifyresetotp",authLimiter,async (req,res)=>{
        const {email,otp}=req.body
       try{
        const user=await User.findOne({email:email})
        if(user.otp!==hashotp(otp)) return res.status(401).json({success:false,message:"Incorrect otp"})
        if(Date.now()-user.otpCreatedAt.getTime()>10*60*1000) return res.status(401).json({success:false,message:"otp expired"}) 
        user.otp="";
        return res.status(200).json({success:true,message:"reset successful"}) 
       }catch(err){
           console.error(err)
            return res.status(500).json({success:false,message:"verification failed please try again"})
       }
   })

   router.post("/resetpassword",async (req,res)=>{
     const {newpass,confirmnewpass,email}=req.body
    try{
         const foundUser=await User.findOne({email:email})

        if(!validatepassword(newpass))  return res.json({success:false,message:"new-Password must have 8 characters including 1 uppercase or lowercase alphabet and 1 digit"})
        if(!validatepassword(confirmnewpass))  return res.json({success:false,message:"confirm new-Password must have 8 characters including 1 uppercase or lowercase alphabet and 1 digit"})
        if(newpass!==confirmnewpass)   return res.json({success:false,message:"confirm new-password does not match with new-password"})

        const hasspassword=await bcrypt.hash(newpass,10)
        foundUser.password=hasspassword
        await foundUser.save()
      return res.status(200).json({success:true,message:"password has been reset try login"})
            
    }catch(err){
        console.error(err)
        return res.status(500).json({success:false,message:"server error"})
    }
    
})


module.exports=router;
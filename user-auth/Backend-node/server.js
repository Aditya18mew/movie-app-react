const express =require("express")
const bcrypt=require("bcrypt")
const {connectdb,user}=require("./login details/db")
const {validatemail,validatepassword}=require("./regex/regex")
const {bcrypting,comparehashpassword}=require("./bcrypting") 
const {generateresetjwt,checkresettoken}=require("./jwttokens")
const cors =require("cors") 
const server=express()
server.use(express.json())
server.use(cors())
connectdb()



server.post("/api/signin",async (req,res)=>{
  const {email,password}=req.body
if(validatemail(email)){
if(!validatepassword(password)){
    return res.json({success:false,message:"Password must have 8 characters including 1 uppercase or lowercase alphabet and 1 digit"})
}else{
let olduser=await user.findOne({Email:email})

if(!olduser){

    return res.status(401).json({success:false,message:"No such account exist"})

} else {

 const {passwordmatch,accesstoken}= await comparehashpassword(email,password,olduser.Password )

 if(passwordmatch===true) {
    return res.status(200).json({success:true,message:"login succesful",accesstoken})
 } else {
    return res.status(401).json({success:false,message:"incorrect password"})
 }
}
}
}else{
    return res.status(401).json({success:false,message:"invalid email"})
} 
 
})


server.post("/api/signup",async (req,res)=>{
    try{
    const {email,password}=req.body

    if(validatemail(email)){

       if(!validatepassword(password)){
      return res.json({success:false,message:"Password must have 8 characters including 1 uppercase or lowercase alphabet and 1 digit"})
       }else{
        let olduser=await user.findOne({Email:email})

    if(!olduser){
    await bcrypting(email,password)
    return res.status(201).json({success:true,message:"signup succesful"})
}else{
    return res.status(409).json({success:false,message:`${email} already in use`})
}

}
}else{
     return res.json({success:false,message:"invalid email"})
    }
}catch(err){
    console.log(err)
}
})




server.post("/api/forgetpassword",async (req,res)=>{
    const {email}=req.body
    if(validatemail(email)){
        let User=await user.findOne({Email:email})
         if(!User){
            res.json({success:false,message:`No account with ${email} email`})
         }else{
          let resetToken= await generateresetjwt(email)
          let link=`http://localhost:5173/resetpassword?token=${resetToken}`
          console.log(link)
           res.json({success:true,message:`Email with a reset link has been sent to ${email}`})
         }
    }else{
        return res.json({success:false,message:"invalid email"})
       }
})

server.post("/api/resetpassword",async (req,res)=>{
    const {newpass,confirmnewpass,Token}=req.body
   let foundUser= await checkresettoken(Token)
    if(!foundUser){
        return res.json({success:false,message:"User not found"})
    }else{
        if(!validatepassword(newpass)){
            return res.json({success:false,message:"new-Password must have 8 characters including 1 uppercase or lowercase alphabet and 1 digit"})
        }else{
            if(!validatepassword(confirmnewpass)){
                return res.json({success:false,message:"confirm new-Password must have 8 characters including 1 uppercase or lowercase alphabet and 1 digit"})
            }else if(newpass!==confirmnewpass){
               return res.json({success:false,message:"confirm new-password does not match with new-password"})
            }else{
                const hasspassword=await bcrypt.hash(newpass,10)
                foundUser.Password=hasspassword
                foundUser.ResetToken=""
                foundUser.TokenExpiry=""
                await foundUser.save()
                res.json({success:true,message:"password has been reset"})
            }
        }
    }
   
})



server.listen(5000,()=>{
    console.log("server is running")
})
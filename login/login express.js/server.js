const express =require("express") 
const logindetails={
    users:require("./login details/people.json"),
    setusers: function(data) {this.users=data}
}
const {validatemail,validatepassword}=require("./regex/regex")
const {bcrypting,comparehashpassword}=require("./bcrypting") 
const cors =require("cors") 
const server=express()
server.use(express.json())
server.use(cors())




server.post("/api/signin",async (req,res)=>{
  const {email,password}=req.body
if(validatemail(email)){
let user=logindetails.users.find((user)=>{
    if(user.Email===email){
        return user
    }
})
if(!user){
    return res.status(401).json({success:false,message:"No such account exist"})
}else{
 const {passwordmatch,accesstoken}= await comparehashpassword(email,password,user.Password)
 if(passwordmatch){
    return res.status(200).json({success:true,message:"login succesful",accesstoken})
 }else{
    return res.json({success:false,message:"incorrect password"})
 }
}
}else{
    return res.status(401).json({success:false,message:"invalid email"})
} 
 
})


server.post("/api/signup",async (req,res)=>{
    const {email,password}=req.body
    if(validatemail(email)){
       if(!validatepassword(password)){
      return res.json({success:false,message:"Password must have 8 characters including 1 uppercase or lowercase alphabet and 1 digit"})
       }else{
       let olduser=logindetails.users.find((user)=>{
        return user.Email===email
    })
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
})

server.post("/api/forgetpassword",(req,res)=>{
    const {Email}=req.body
    if(validatemail){
         let user=logindetails.users.find((user)=>{
            if(user.Email===Email){
                return true
            }
         })
         if(!user){
            res.json({success:false,message:`No account with ${Email} email`})
         }else{
            res.json({success:true,message:`Email with a reset link has been sent to ${Email}`})
         }
    }else{
        return res.json({success:false,message:"invalid email"})
       }
})



server.listen(5000,()=>{
    console.log("server is running")
})
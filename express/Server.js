const express=require("express")
const cookieParser=require("cookie-parser")
const {verifyotp,connectdb,User}=require("./mongoosedb")
const {validatemail,validatepassword}=require("./regex/regex")
const {bcrypting,comparehashpassword}=require("./bcrypt")
const {sendresetotpemail}=require("./nodemailer")
const {verifyUser}=require("./middleware")
require("dotenv").config()
const key=process.env. API_KEY
const cors=require("cors")
const { default: axios } = require("axios")
const { generatejwt } = require("./jwttokens")
const {randomInt}=require("crypto")



const server=express()
server.use(cookieParser())
server.use(express.json())
server.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
connectdb()


server.get("/api/checkauthorization",verifyUser, async (req,res)=>{
    res.json({success:true})
} )

server.post("/api/signup",async (req,res)=>{
    try{
    const {email,password}=req.body
    if(validatemail(email)){
       if(!validatepassword(password)){
      return res.json({success:false,message:"Password must have 8 characters including 1 uppercase or lowercase alphabet and 1 digit"})
       }else{
        let olduser=await User.findOne({Email:email})
    if(!olduser){
   const {success}=await bcrypting(email,password)
    return res.status(201).json({success:success,message:"otp sended via mail"})
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


server.post("/api/verifyotp",async (req,res)=>{
    try{
       const {email,otp}=req.body
     const result=await verifyotp(email,otp)
     if(result===true){
    const {AccessToken,RefreshToken}=await generatejwt(email)
     res.cookie("MovieappAccessToken",AccessToken,{
        maxAge:15*60*60,
        path:"/",
        secure:false,
        httpOnly:true,
        sameSite:"lax"
     })

     res.cookie("MovieappRefreshToken",RefreshToken,{
        maxAge:60*60*24*7,
        path:"/",
        secure:false,
        httpOnly:true,
        sameSite:"lax"
     })
      return res.json({success:true,message:"sign-up successful"})
     }else{
        return res.json({success:false,message:"Incorrect otp"})
     }
    }catch(err){
        console.log(err)
    }
})

server.post("/api/signin",async (req,res)=>{
  const {email,password}=req.body
if(validatemail(email)){
if(!validatepassword(password)){
    return res.json({success:false,message:"Password must have 8 characters including 1 uppercase or lowercase alphabet and 1 digit"})
}else{
let olduser=await User.findOne({Email:email})

if(!olduser){
    return res.status(401).json({success:false,message:"No such account exist"})
} else {

 const  {passwordmatch,AccessToken,RefreshToken}= await comparehashpassword(email,password,olduser.Password)

 if(passwordmatch===true) {
      res.cookie("MovieappAccessToken",AccessToken,{
        maxAge:15*60*60,
        path:"/",
        secure:process.env.NODE_ENV==="production",
        httpOnly:false,
        sameSite:"lax"
     })
     res.cookie("MovieappRefreshToken",RefreshToken,{
        maxAge:60*60*24*7,
        path:"/",
        secure:false,
        httpOnly:true,
        sameSite:"lax"
     })
    return res.status(200).json({success:true,message:"login succesful"})
 } else {
    return res.status(401).json({success:false,message:"incorrect password"})
 }
}
}
}else{
    return res.status(401).json({success:false,message:"invalid email"})
} 
})



server.post("/api/forgetpassword",async (req,res)=>{
    const {email}=req.body
    if(validatemail(email)){
        let User=await User.findOne({Email:email})
         if(!User){
            res.json({success:false,message:`No account with ${email} email`})
         }else{
            const otp=randomInt(100000,999999).toString()
            let iserror=await sendresetotpemail(email,otp)
         if(iserror){
            res.json({success:false,message:"Unable to send a email"})
         }else{
           res.json({success:true,message:`Email with a reset otp has been sent`})
         }
        }
    }else{
        return res.json({success:false,message:"invalid email"})
       }
})


server.post("/api/verifyresetotp",async (req,res)=>{
    try{
       const {email,otp}=req.body
     const user=await User.findOne({"Email":email})
     if(user.otp===otp){
      return res.json({success:true,message:"sign-up successful"})
     }else{
        return res.json({success:false,message:"Incorrect otp"})
     }
    }catch(err){
        console.log(err)
    }
})



server.post("/api/resetpassword",async (req,res)=>{
    const {newpass,confirmnewpass,email}=req.body
    const foundUser=await User.findOne({Email:email})
    if(!foundUser){
        return res.json({success:false,message:"No such account exist"})
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
                await foundUser.save()
                res.json({success:true,message:"password has been reset"})
            }
        }
    }
   
})






server.post("/api/popularmovies",verifyUser, async (req,res)=>{
    const {page}=req.body
    const randomPage=page || Math.floor((Math.random()*50)+1)
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${randomPage}`
    try{
     const response=await axios(url)
     const arr=response.data.results
     res.json({success:true,arr})
    }catch(err){
        res.json({success:false,err})
    }
})
server.post("/api/searchmovie", verifyUser, async (req,res)=>{
    const {name}=req.body
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${name}&language=en-US`
    try{
     const response=await axios(url)
        const arr=response.data.results
        res.json({success:true,arr})
    }catch(err){
        res.json({success:false,err})
    }
})

server.post("/api/setwishlist", verifyUser, async (req,res)=>{
    const {id,title,poster_path,overview}=req.body
     try{
        const newuser=await User.findOne()
        if(!newuser){
           await user.create({Wishlist:[{id:id,title:title,poster_path:poster_path,overview:overview}]})
           res.status(200).json({success:true,message:"created a new user"})
        }else{
            const checkid=await User.exists({"Wishlist.id":id})
            if(!checkid){newuser.Wishlist.push({id:id,title:title,poster_path:poster_path,overview:overview})
                await newuser.save()
            res.status(200).json({success:true,message:"added to Wishlist"})
            }else{
                await user.updateOne({},{$pull:{Wishlist:{id:id}}})
                res.status(200).json({success:true,message:"removed from Wishlist"})
            }
        }
    }
     catch(err){
        res.json({success:false,message:`${err}`})
     }
})
server.post("/api/setfavorites", verifyUser, async (req,res)=>{
    const {id,title,poster_path,overview}=req.body
     try{
        const newuser=await User.findOne()
        if(!newuser){
           await user.create({Favorites:[{id:id,title:title,poster_path:poster_path,overview:overview}]}) 
           res.status(200).json({success:true,message:"created a new user"})
        }else{
            const checkid=await user.exists({"Favorites.id":id})
            if(!checkid){
                newuser.Favorites.push({id:id,title:title,poster_path:poster_path,overview:overview})
                await newuser.save()
                res.status(200).json({success:true,message:"added to favorites"})
            }else{
                await user.updateOne({},{$pull:{Favorites:{id:id}}})
                res.status(200).json({success:true,message:"removed from Wishlist"})
            }  
        }
    }
     catch(err){
        res.json({success:false,message:`${err}`})
     }
})

server.post("/api/getwishlist",verifyUser, async (req,res)=>{
    const {name}=req.body
    try{
        const olduser=await User.findOne()
       const arr=olduser.Wishlist
        res.status(200).json({success:true,results:arr})
    }catch(err){
        console.log(err)
    }
})
server.post("/api/getfavorites", verifyUser, async (req,res)=>{
      
    try{
        const olduser=await User.findOne()
       const arr=olduser.Favorites
        res.status(200).json({success:true,results:arr})
    }catch(err){
        console.log(err)
    }
})





server.listen(3000,()=>{
    console.log("listening")
})
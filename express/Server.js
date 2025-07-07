const express=require("express")
const cookieParser=require("cookie-parser")
const {verifyotp,connectdb,User}=require("./mongoosedb")
const {validatemail,validatepassword}=require("./regex/regex")
const {bcrypting,comparehashpassword}=require("./bcrypt") 
require("dotenv").config()
const key=process.env. API_KEY
const cors=require("cors")
const { default: axios } = require("axios")
const { generatejwt } = require("./jwttokens")



const server=express()
server.use(cookieParser())
server.use(express.json())
server.use(cors())
connectdb()

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
     res.cookie("AccessToken",AccessToken,{
        maxAge:15*60*60,
        path:"/",
        secure:process.env.NODE_ENV==="production",
        httpOnly:true,
        sameSite:"strict"
     })
     res.cookie("RefreshToken",RefreshToken,{
        maxAge:60*60*24*7,
        path:"/",
        secure:process.env.NODE_ENV==="production",
        httpOnly:true,
        sameSite:"strict"
     })
      return res.json({success:true,message:"sign-up successful"})
     }else{
        return res.json({success:false,message:"Incorrect otp"})
     }
    }catch(err){
        console.log(err)
    }
})






server.post("/api/popularmovies", async (req,res)=>{
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
server.post("/api/searchmovie", async (req,res)=>{
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

server.post("/api/setwishlist", async (req,res)=>{
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
server.post("/api/setfavorites", async (req,res)=>{
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

server.post("/api/getwishlist", async (req,res)=>{
    const {name}=req.body
    try{
        const olduser=await User.findOne()
       const arr=olduser.Wishlist
        res.status(200).json({success:true,results:arr})
    }catch(err){
        console.log(err)
    }
})
server.post("/api/getfavorites", async (req,res)=>{
    const {name}=req.body
    try{
        const olduser=await User.findOne()
       const arr=olduser.Favorites
        res.status(200).json({success:true,results:arr})
    }catch(err){
        console.log(err)
    }
})





server.listen(5000,()=>{
    console.log("listening")
})
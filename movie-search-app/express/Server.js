const express=require("express")
const {connectdb,user}=require("./mongoosedb")
require("dotenv").config()
const key=process.env. API_KEY
const cors=require("cors")
const { default: axios } = require("axios")



const server=express()

server.use(express.json())
server.use(cors())
connectdb()

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
        const newuser=await user.findOne()
        if(!newuser){
           await user.create({Wishlist:[{id:id,title:title,poster_path:poster_path,overview:overview}]})
           res.status(200).json({success:true,message:"created a new user"})
        }else{
            const checkid=await user.exists({"Wishlist.id":id})
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
        const newuser=await user.findOne()
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





server.listen(5000,()=>{
    console.log("listening")
})
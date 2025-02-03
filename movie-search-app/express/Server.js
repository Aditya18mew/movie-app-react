const express=require("express")
require("dotenv").config()
const key=process.env. API_KEY
const cors=require("cors")
const { default: axios } = require("axios")



const server=express()

server.use(express.json())
server.use(cors())

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

server.listen(5000,()=>{
    console.log("listening")
})
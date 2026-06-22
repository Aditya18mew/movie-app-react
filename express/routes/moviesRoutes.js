const express=require("express")
const { default: axios } = require("axios")
const key=process.env.API_KEY
const {verifyUser,refreshtokens}=require("../middleware/Authmiddleware")
const {User}=require("../utils/mongoosedb")
const authguard=[refreshtokens,verifyUser]


const router=express.Router()



router.get("/popularmovies",authguard, async (req,res)=>{
    const randomPage=Math.floor((Math.random()*25)+1)
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${randomPage}`
    try{
     const response=await axios(url)
     const arr=response.data.results
     return res.status(200).json({success:true,arr})
    }catch(err){
        console.error(err)
        return res.status(500).json({success:false,err})
    }
})

router.post("/searchmovie",authguard, async (req,res)=>{
    const {name}=req.body
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${name}&language=en-US`
    try{
     const response=await axios(url)
    const arr=response.data.results
      return  res.status(200).json({success:true,arr})
    }catch(err){
        console.error(err)
        return res.status(500).json({success:false,err})
    }
})

router.post("/setwishlist",authguard, async (req,res)=>{
    const {id,title,poster_path,overview}=req.body
    const {Email}=req.user
     try{
        const newuser=await User.findOne({"Email":Email})
         const isthere=await newuser.wishlist.some((item)=>item.tmdbId===id)
             if(!isthere){
                newuser.wishlist.push({tmdbId:id,title:title,poster_path:poster_path,overview:overview})
                await newuser.save()
              return  res.status(200).json({success:true,message:"added to Wishlist"})
             }else{
                await User.updateOne({"Email":Email},{$pull:{wishlist:{tmdbId:id}}})
             return  res.status(200).json({success:true,message:"removed from Wishlist"})
            }
        }
     catch(err){
        console.error(err)
       return  res.json({success:false,message:`${err}`})
     }
})

router.post("/setfavorites",authguard, async (req,res)=>{
    const {id,title,poster_path,overview}=req.body
     const {Email}=req.user
     try{
        const newuser=await User.findOne({"Email":Email})
          const isthere=await newuser.favorites.some((item)=>item.tmdbId===id)
            if(!isthere){
                newuser.favorites.push({tmdbId:id,title:title,poster_path:poster_path,overview:overview})
                console.log(newuser)
                await newuser.save()
                res.status(200).json({success:true,message:"added to favorites"})
            }else{
                await User.updateOne({"Email":Email},{$pull:{favorites:{tmdbId:id}}})
                res.status(200).json({success:true,message:"removed from Wishlist"})
            }  
        }
     catch(err){
        console.error(err)
       return res.json({success:false,message:`${err}`})
     }
})

router.get("/getwishlist",authguard, async (req,res)=>{
    const {Email}=req.user
    try{
        const olduser=await User.findOne({"Email":Email})
       const arr=olduser.wishlist
        res.status(200).json({success:true,results:arr})
    }catch(err){
        console.error(err)
        return res.json({success:false,message:`${err}`})
    }
})

router.get("/getfavorites",authguard, async (req,res)=>{
      const {Email}=req.user
    try{
        const olduser=await User.findOne({"Email":Email})
       const arr=olduser.favorites
        res.status(200).json({success:true,results:arr})
    }catch(err){
        console.error(err)
        return res.json({success:false,message:`${err}`})
    }
})


module.exports=router
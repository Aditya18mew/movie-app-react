const express=require("express")
const { default: axios } = require("axios")
const key=process.env.API_KEY
const {verifyUser,refreshtokens}=require("../middleware/Authmiddleware")
const {User}=require("../utils/mongoosedb")
const { apiLimiter } = require("../middleware/ratelimiter")
const authguard=[refreshtokens,verifyUser]



const router=express.Router()



router.get("/popularmovies",apiLimiter,authguard, async (req,res)=>{
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

router.get("/trendingmovies",apiLimiter,authguard, async (req,res)=>{
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`
    try{
     const response=await axios(url)
     const arr=response.data.results
     return res.status(200).json({success:true,arr})
    }catch(err){
        console.error(err)
        return res.status(500).json({success:false,err})
    }
})

router.post("/searchmovie",apiLimiter,authguard, async (req,res)=>{
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
        const user = await User.findOne({ email: Email })
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    const isthere = user.wishlist.some(item => item.id === id)
             if(!isthere){
             await User.updateOne(
                {email:Email},
                {$push:{wishlist:{id:id,title:title,poster_path:poster_path,overview:overview}}}
            )
             return  res.status(200).json({success:true,message:"added to Wishlist"})

             }else{
                await User.updateOne(
                    {email:Email},
                    {$pull:{wishlist:{id:id}}}
            )
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
        const user = await User.findOne({ email: Email })
    if (!user) return res.status(404).json({ success: false, message: "User not found" })

        const isthere = user.favorites.some(item => item.id === id)
             if(!isthere){
             await User.updateOne(
                {email:Email},
                {$push:{favorites:{id:id,title:title,poster_path:poster_path,overview:overview}}}
            )
             return  res.status(200).json({success:true,message:"added to favorites"})

             }else{
                await User.updateOne(
                    {email:Email},
                    {$pull:{favorites:{id:id}}}
            )
             return  res.status(200).json({success:true,message:"removed from favorites"})
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
        const olduser=await User.findOne({email:Email})
       const arr=olduser.wishlist
        return res.status(200).json({success:true,arr})
    }catch(err){
        console.error(err)
        return res.json({success:false,err})
    }
})

router.get("/getfavorites",authguard, async (req,res)=>{
      const {Email}=req.user
    try{
        const olduser=await User.findOne({email:Email})
       const arr=olduser.favorites
      return res.status(200).json({success:true,arr})
    }catch(err){
        console.error(err)
        return res.json({success:false,err})
    }
})


module.exports=router
const express=require("express")
const { default: axios } = require("axios")
const key=process.env.API_KEY
const {verifyUser,refreshtokens}=require("../middleware/Authmiddleware")
const {User}=require("../utils/mongoosedb")
const { apiLimiter } = require("../middleware/ratelimiter")
const client = require("../config/Redis")
const authguard=[refreshtokens,verifyUser]


  async function fetchFromApi(url,retries=3,timeout=8000){
    for(let i=0;i<retries;i++){
        try{
         const response=await axios(url,{timeout:timeout})
         return response.data
    }catch(err){
        if(err.code==='ECONNRESET' && i<retries-1){
          await new Promise(res=>setTimeout(res,1000*(i+1)));
          continue;
        }
       throw err
    }
    }
  }


const router=express.Router()


router.get("/public/posters", async (req,res)=>{
       const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`
    try{
    const cacheKey=`moviesearch:tmdb:trending`

      const cached=await client.get(cacheKey)
      const posters=JSON.parse(cached)

      if(cached) return res.status(200).json({success:true,arr:posters.map(movie=>({
        id:movie.id,
        poster_path:movie.poster_path
     }))})
        
       const data=await fetchFromApi(url)
       const arr=data.results.map(movie=>({
         id:movie.id,
         title:movie.title,
         poster_path:movie.poster_path,
         overview:movie.overview,
         isInWishlist:false,
         isInFavorite:false
       }))
       
     await client.setEx(cacheKey,1800,JSON.stringify(arr))

     return res.status(200).json({success:true,arr:arr.map(movie=>({
        id:movie.id,
        poster_path:movie.poster_path
     }))})
    }catch(err){
        console.error(err)
        return res.status(500).json({success:false,err})
    }
})


router.get("/popularmovies",apiLimiter,authguard, async (req,res)=>{
    const randomPage=Math.floor((Math.random()*50)+1)
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${randomPage}`
    try{
      const cacheKey=`moviesearch:tmdb:popular:${randomPage}`

      const cached=await client.get(cacheKey)
      if(cached) return res.status(200).json({success:true,arr:JSON.parse(cached)})
        
       const data=await fetchFromApi(url)
       const arr=data.results.map(movie=>({
         id:movie.id,
         title:movie.title,
         poster_path:movie.poster_path,
         overview:movie.overview,
         isInWishlist:false,
         isInFavorite:false
       }))

     await client.setEx(cacheKey,600,JSON.stringify(arr))
     return res.status(200).json({success:true,arr})
    }catch(err){
        console.error(err)
        return res.status(500).json({success:false,err})
    }
})

router.get("/trendingmovies",apiLimiter,authguard, async (req,res)=>{
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`
    try{
    const cacheKey=`moviesearch:tmdb:trending`

      const cached=await client.get(cacheKey)
      if(cached) return res.status(200).json({success:true,arr:JSON.parse(cached)})
        
       const data=await fetchFromApi(url)
       const arr=data.results.map(movie=>({
         id:movie.id,
         title:movie.title,
         poster_path:movie.poster_path,
         overview:movie.overview,
         isInWishlist:false,
         isInFavorite:false
       }))
       
     await client.setEx(cacheKey,1800,JSON.stringify(arr))

     return res.status(200).json({success:true,arr})
    }catch(err){
        console.error(err)
        return res.status(500).json({success:false,err})
    }
})

router.get("/movie/:id",apiLimiter,authguard,async (req,res)=>{
      const {id}=req.params
      const url=`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
      try{
    /*   const response=await axios(url) */
      const data=await fetchFromApi(url)
      const details={
         id:data.id,
         title:data.title,
         overview:data.overview,
         poster_path:data.poster_path,
         backdrop_path:data.backdrop_path,
         release_date:data.release_date,
         runtime:data.runtime,
         vote_average:data.vote_average,
         genres:data.genres,
         tagline:data.tagline
      }
       return res.status(200).json({success:true,details})
      }catch(err){
            console.error(err)
        return res.status(500).json({success:false,err})
      }
})


router.get("/movie/:id/videos",authguard, async (req,res)=>{
    const {id}=req.params
    const url=`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`
    try{
       const data= await fetchFromApi(url)
       const trailer=data.results?.find(v=>
        v.type==='Trailer' && v.site==='YouTube' && v.official===true
       )
       res.status(200).json({success:true,key: trailer?.key || null})
    }catch(err){
       return res.status(500).json({success:false,key:null})
    }
})


router.get("/movie/:id/recommendations",apiLimiter,authguard,async (req,res)=>{
    const {id}=req.params
    const url=`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${key}&language=en-US`
    try{
       const data=await fetchFromApi(url)
       const arr=data.results.map(movie=>({
         id:movie.id,
         title:movie.title,
         poster_path:movie.poster_path,
         overview:movie.overview,
         isInWishlist:false,
         isInFavorite:false
       }))
       res.status(200).json({success:true,arr})
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
    const {id,title,poster_path,overview,isInWishlist,isInFavorite}=req.body
    const {Email}=req.user
     try{
        const user = await User.findOne({ email: Email })
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    const isthere = user.wishlist.some(item => item.id === id)
             if(!isthere){
             await User.updateOne(
                {email:Email},
                {$push:{wishlist:{id:id,title:title,poster_path:poster_path,overview:overview,isInWishlist:isInWishlist,isInFavorite:isInFavorite}}}
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
    const {id,title,poster_path,overview,isInWishlist,isInFavorite}=req.body
     const {Email}=req.user
     try{
        const user = await User.findOne({ email: Email })
    if (!user) return res.status(404).json({ success: false, message: "User not found" })

        const isthere = user.favorites.some(item => item.id === id)
             if(!isthere){
             await User.updateOne(
                {email:Email},
                {$push:{favorites:{id:id,title:title,poster_path:poster_path,overview:overview,isInWishlist:isInWishlist,isInFavorite:isInFavorite}}}
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
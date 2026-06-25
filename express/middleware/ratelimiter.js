const ratelimit=require("express-rate-limit")

const apiLimiter=ratelimit({
    windowMs:1*60*1000,
    max:30,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message:"Too many requests"
    }
})


const authLimiter=ratelimit({
    windowMs:10*60*1000,
    max:10,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message:"Too many requests"
    }
})


module.exports={apiLimiter,authLimiter}
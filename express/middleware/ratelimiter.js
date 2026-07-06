const ratelimit=require("express-rate-limit")
const  {RedisStore} = require("rate-limit-redis")
const client = require("../config/Redis")

const apiLimiter=ratelimit({
    windowMs:1*60*1000,
    max:30,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message:"Too many requests"
    },
    store:new RedisStore({
        sendCommand:(...args)=>client.sendCommand(args),
        prefix:'movieapp:rl:api:'
    })
})


const authLimiter=ratelimit({
    windowMs:10*60*1000,
    max:10,
    keyGenerator: (req) => req.body.email,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message:"Too many requests"
    },
    store:new RedisStore({
        sendCommand:(...args)=>client.sendCommand(args),
        prefix:'movieapp:rl:auth'
    })
})

const otplimiter=ratelimit({
    windowMs:1*60*60*1000,
    max:9,
    keyGenerator: (req) => req.body.email,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message:"Too many request"
    },
    store:new RedisStore({
        sendCommand:(...args)=>client.sendCommand(args),
        prefix:"movieapp:rl:resendotp"
    })
})


module.exports={apiLimiter,authLimiter,otplimiter}
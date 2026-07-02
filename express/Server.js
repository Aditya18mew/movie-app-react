require("dotenv").config()
const envRequired = require("./config/config")
envRequired()

const express=require("express")
require("./config/Redis")
const cookieParser=require("cookie-parser")
const {connectdb,User,unverifiedUser}=require("./utils/mongoosedb")
const {verifyUser,refreshtokens}=require("./middleware/Authmiddleware")
const authRoutes=require("./routes/authRoutes")
const moviesRoutes=require("./routes/moviesRoutes")


const cors=require("cors")



const server=express()
server.use(cookieParser())
server.use(express.json())
server.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
connectdb()

setInterval(async () => {
    await unverifiedUser.deleteMany(
        { otpCreatedAt: { $lt: new Date(Date.now() - 10 * 60 * 1000) } }
    )
    await User.updateMany(
        { otpCreatedAt: { $lt: new Date(Date.now() - 10 * 60 * 1000) } },
        { otp: null, otpCreatedAt: null }
    )
}, 60 * 60 * 1000)

server.use("/api",authRoutes)
server.use("/api",moviesRoutes)

server.get("/api/checkauthorization",refreshtokens,verifyUser, async (req,res)=>{
    res.json({success:true})
} )


server.listen(process.env.PORT || 3000,()=>{
    console.log("listening")
})
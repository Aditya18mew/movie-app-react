const mongoose=require("mongoose")

const movieItemSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    poster_path:String,
    overview:String,
    isInWishlist:Boolean,
    isInFavorite:Boolean
},{_id:false})


const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
       type:String,
       required:true
    },
    otp:{
        type:String,
        default:null
    },
    otpCreatedAt:{
        type:Date,
        default:null
    },
    wishlist:[movieItemSchema],
    favorites:[movieItemSchema]
})

const unverifiedUserSchema=mongoose.Schema({
   email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
       type:String,
       required:true
    },
    otp:{
        type:String,
        default:null
    },
    otpCreatedAt:{
        type:Date,
        default:null
    }
})


const User=mongoose.model("user",userSchema)
const unverifiedUser=mongoose.model("unverifieduser",unverifiedUserSchema)




async function connectdb(){
    try{
   await mongoose.connect(process.env.MONGO_DB_URL)
    }catch(err){
        console.error(err)
        process.exit(1)
    }
}


module.exports={unverifiedUser,connectdb,User}
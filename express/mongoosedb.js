const mongoose=require("mongoose")


const userschema=mongoose.Schema({
    id:String,
    Email:String,
    Password:String,
    otp:String,
    RefreshToken:String,
    CreatedAt:Date,
    ExpiredAt:Date,
    Wishlist:[{
        id:Number,
        title:String,
        poster_path:String || null,
        overview:String || null
    }],
    Favorites:[{
        id:Number,
        title:String ,
        poster_path:String || null,
        overview:String || null
    }]
})


const User=mongoose.model("user",userschema)




async function connectdb(){
    try{
   await mongoose.connect("mongodb://localhost:27017/moviedatabase")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}


async function verifyotp(email,otp){
    try{
     const user=await User.findOne({"Email":email})
     if(user.otp===otp){
        return true
     }else{
        return false
     }
    }catch(err){
        console.log(err)
    }
}


module.exports={verifyotp,connectdb,User}
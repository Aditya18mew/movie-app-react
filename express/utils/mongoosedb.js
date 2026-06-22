const mongoose=require("mongoose")

const movieItemSchema=mongoose.Schema({
    tmdbId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    poster_path:String,
    overview:String
},{_id:false})


const userSchema=mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    Password:{
       type:String,
       required:true
    },
    otp:String,
    wishlist:[movieItemSchema],
    favorites:[movieItemSchema]
})

const unverifiedUserSchema=mongoose.Schema({
    Email:String,
    Password:String,
    otp:String
})


const User=mongoose.model("user",userSchema)
const unverifiedUser=mongoose.model("unverifieduser",unverifiedUserSchema)




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
     const user=await unverifiedUser.findOne({"Email":email})
     if(user.otp===otp){
         const newuser=new User({
        Email:user.Email,
        Password:user.Password,
       })
       await newuser.save()
       await unverifiedUser.findByIdAndDelete(user._id)
        return true
     }else{
        return false
     }
    }catch(err){
        console.log(err)
    }
}




module.exports={unverifiedUser,connectdb,User}
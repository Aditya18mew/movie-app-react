const mongoose=require("mongoose")


const userSchema = new mongoose.Schema({
    id:String,
    Email:String,
    Password:String,
})


const user=mongoose.model("User",userSchema)


const connectdb= async (user_details)=>{
  try{
    await mongoose.connect("mongodb://localhost:27017/database")
    const newuser=new user(user_details)
    await newuser.save()
    const dec=await user.find()
    console.log(dec)
  }catch(err){
    console.log(err)
  }
}


module.exports={connectdb}



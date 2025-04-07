const mongoose=require("mongoose")


const userSchema = new mongoose.Schema({
    id:String,
    Email:String,
    Password:String,
    ResetToken:String,
    TokenExpiry:Date,
})


const user=mongoose.model("user",userSchema)


const connectdb= async ()=>{
  try{
   await mongoose.connect("mongodb://localhost:27017/database")
  }catch(err){
    console.log(err)
    process.exit(1)
  }
}






module.exports={connectdb,user}




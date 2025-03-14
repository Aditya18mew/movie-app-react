const mongoose=require("mongoose")


const userschema=mongoose.Schema({
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


const user=mongoose.model("user",userschema)




async function connectdb(){
    try{
   await mongoose.connect("mongodb://localhost:27017/moviedatabase")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}


module.exports={connectdb,user}
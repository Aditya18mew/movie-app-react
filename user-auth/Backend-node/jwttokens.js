const jwt=require("jsonwebtoken")
const {connectdb,user}=require("./login details/db")
require("dotenv").config()
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET

async function generatejwt(email){

    const chosenone=await user.findOne({Email:email})

    const accesstoken=jwt.sign({
        id:chosenone._id,
        Email:chosenone.Email
    },ACCESS_TOKEN_SECRET,{expiresIn:"15m"})

   
return accesstoken

}

module.exports={generatejwt}
const bcrypt=require("bcrypt")
const {connectdb,user}=require("./login details/db")
const {generatejwt}=require("./jwttokens")
const fs=require("fs")

async function bcrypting(email,password){
    try{
       const hasspassword=await bcrypt.hash(password,10)
       const newuser=new user({
        Email:email,
        Password:hasspassword
       })
       await newuser.save()
    }catch(err){
        console.log(err)
    }
}


async function comparehashpassword(email,password,hashpassword){
    try{
     const passwordmatch=await bcrypt.compare(password,hashpassword)
     if(!passwordmatch){
        return {passwordmatch:false,accesstoken:null}
     }
     const accesstoken=await generatejwt(email)
     return {passwordmatch,accesstoken}
    }catch(err){
        console.log(err)
    }
}


module.exports={bcrypting,comparehashpassword}


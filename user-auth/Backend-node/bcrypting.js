const bcrypt=require("bcrypt")
const {v4:uuidv4}=require("uuid")
const {connectdb}=require("./login details/db")
const logindetails={
    users:require("./login details/people.json"),
    setusers: function(data) {this.users=data}
}
const {generatejwt}=require("./jwttokens")
const fs=require("fs")

async function bcrypting(email,password){
    try{
       const hasspassword=await bcrypt.hash(password,10)
       const userid=uuidv4()
       const newuser={
        id:userid,
        Email:email,
        Password:hasspassword
    }
    connectdb(newuser)
    logindetails.setusers([...logindetails.users,newuser])
    fs.writeFile("./login details/people.json",JSON.stringify(logindetails.users,null,2),(err)=>{
   if(err){
    console.log(err)
   }})
    }catch(err){
        console.log(err)
    }
}


async function comparehashpassword(email,password,hashpassword){
    try{
     const passwordmatch=await bcrypt.compare(password,hashpassword)
    const accesstoken=await generatejwt(email)
    
     return {passwordmatch,accesstoken}
    }catch(err){
        console.log(err)
    }
}


module.exports={bcrypting,comparehashpassword}


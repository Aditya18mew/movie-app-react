const jwt=require("jsonwebtoken")
const logindetails={
    users:require("./login details/people.json"),
    setusers: function(data) {this.users=data}
}
require("dotenv").config()
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET

async function generatejwt(email){

    const chosenone=logindetails.users.find((user)=>{
        if(user.Email===email){
            return true
        }
    })
    const accesstoken=jwt.sign({
        id:chosenone.id,
        Email:chosenone.Email
    },ACCESS_TOKEN_SECRET,{expiresIn:"15m"})

   
return accesstoken

}

module.exports={generatejwt}
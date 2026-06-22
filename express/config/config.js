
const required=[
    "API_KEY",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "EMAIL_ADMIN",
    "EMAIL_APP_PASS"
]

const envRequired=()=>{
    required.forEach(key=>{
        if(!process.env[key]){
            throw new Error(`Error: missing ${key} env`)
        }
    })
}


module.exports=envRequired
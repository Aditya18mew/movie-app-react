import { useState } from "react"
import axios from "axios"

export function Forgetpassword(){
    const [email,setemail]=useState("")
    const [message,setmessage]=useState("")
    const [loading,setloading]=useState(false)

function handlechange(event){
const {value}=event.target
setemail(value)
}
 async function forgetpasswordhandle(event){
    event.preventDefault()
    setloading(true)
    try{
    const response=await axios.post("http://localhost:5000/api/forgetpassword",{Email:email})
    setloading(false)
    setmessage(response.data.message)
    console.log(response.data)
    }catch(err){
        setloading(false)
        setmessage("Error:Unable to send reset link!")
        console.log(err)
    }
}

    return <div className="forgetpassworddiv">
        <h1>Forget password</h1>
  <form action="forgot" className="form">
    <input type="email" value={email} onChange={handlechange} name="email" id="email" placeholder="Email"/>
   <button onClick={forgetpasswordhandle}>{loading?"Sending...":"Send Reset Link"}</button>
  </form>
  <p>{message}</p>
    </div>
}
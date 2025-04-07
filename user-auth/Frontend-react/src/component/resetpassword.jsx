import { useEffect, useState } from "react"
import { Dashboard } from "./dashboard"
import axios from "axios"



export const Resetpassword=()=>{
      const [success,setsuccess]=useState(false)
      const [newpassword,setnewpassword]=useState({
        name:"newpass",
        password:""  
      })
      const [confirmnewpassword,setconfirmnewpassword]=useState({
        name:"confirmnewpass",
        password:""
      })
      const [token,settoken]=useState("")

      function handlechange(event){
       const {name,value}=event.target
        if(name==="newpass"){
          setnewpassword({...newpassword,password:value})
        }
        if(name==="confirmnewpass"){
          setconfirmnewpassword({...confirmnewpassword,password:value})
        }
      }

     async function handlesubmit(event){
    event.preventDefault()
    try {
         const response=await axios.post("http://localhost:5000/api/resetpassword",{newpass:newpassword.password,confirmnewpass:confirmnewpassword.password,Token:token})
        console.log(response.data)
        setsuccess(response.data.success)
    } catch (error) {
      console.log(error)
    }
    }
useEffect(()=>{
const queryParams=new URLSearchParams(window.location.search)
const resettoken=queryParams.get("token")
settoken(resettoken)
},[])





      return <>{success? <Dashboard str={"reset your password"}></Dashboard>:
      <div className="resetpassworddiv">
      <h1>Reset password</h1>
       <form action="reset" onSubmit={handlesubmit} className="resetform">
      <input type="password" name="newpass" onChange={handlechange} placeholder="New password" />
      <input type="password" name="confirmnewpass" onChange={handlechange} placeholder="Confirm New password" />
      <span>Minimum 8 characters with atleast one letter and one digit</span>
      <button type="submit">Submit</button>
       </form>
      
      </div>
        }
      </>
}



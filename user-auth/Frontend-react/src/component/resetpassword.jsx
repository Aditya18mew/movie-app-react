import { useState } from "react"
import { Dashboard } from "./dashboard"



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

      function handlechange(event){
       const {name,value}=event.target
        if(name==="newpass"){
          setnewpassword({...newpassword,password:value})
        }
        if(name==="confirmnewpass"){
          setconfirmnewpassword({...confirmnewpassword,password:value})
        }
      }

    function handlesubmit(event){
    event.preventDefault()
    if(newpassword.password===confirmnewpassword.password){
        setsuccess(true)
    }
    }






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



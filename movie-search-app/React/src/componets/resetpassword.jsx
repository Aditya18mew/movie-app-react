import { useEffect, useState } from "react"
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
      const [errors,seterrors]=useState({
        newpass:false,
        confirmnewpass:false,
        isnotsame:false
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

     async function handlesubmit(event){
      event.preventDefault()
      const newerrors={
        newpass:newpassword.password.trim()==="",
        confirmnewpass:confirmnewpassword.password.trim()==="",
        isnotsame:newpassword.password!==confirmnewpassword.password
      }
      seterrors(newerrors)
      if(errors.confirmnewpass || errors.newpass)  return
      if(newerrors.isnotsame){
        setconfirmnewpassword({...confirmnewpassword,password:""})
        return
      }
     
    try {
         const response=await axios.post("http://localhost:5000/api/resetpassword",{newpass:newpassword.password,confirmnewpass:confirmnewpassword.password,Token:token})

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





      return   <div className="resetpassworddiv">
      <h1>Reset password</h1>
       <form onSubmit={handlesubmit} className="resetform">
      <input type="password" className={errors.newpass?"formerrorinput":"forminput"} name="newpass" value={newpassword.password} onChange={(event)=>{
        handlechange(event)
        seterrors(prev=>({...prev,[event.target.name]:false,["isnotsame"]:false}))
      }} placeholder={errors.newpass? "❗New Password is required" : "New Password"} />

      <input type="password" className={errors.confirmnewpass?"formerrorinput":errors.isnotsame?"formerrorinput":"forminput"} name="confirmnewpass" value={confirmnewpassword.password} onChange={(event)=>{
         handlechange(event)
         seterrors(prev=>({...prev,[event.target.name]:false,["isnotsame"]:false}))
      }} placeholder={errors.confirmnewpass?"❗Confirm New Password is required": errors.isnotsame? "❗ Passwords do not match":"Confirm New Password"} />
      <span>Minimum 8 characters with atleast one letter and one digit</span>
      <button className="outerlayerbutton" type="submit">Submit</button>
       </form>    
      </div>
}

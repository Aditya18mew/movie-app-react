import {useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { validatePassword } from "../utils/regex"
import { Spinner } from "../components/buttons"
import {backendUrl} from "../utils/config"



export const Resetpassword=()=>{

      const navigate=useNavigate()
      const location=useLocation()
      const {email}=location.state

      const [newpassword,setnewpassword]=useState({
        newpass:"",
        confirmnewpass:""  
      })
      const [errors,seterrors]=useState({
        newpass:{valid:true,message:""},
        confirmnewpass:{valid:true,message:""},
        issame:true
      })

      const [sMessage,setsMessage]=useState("Submit")
      const [isloading,setisloading]=useState(false)

    function handlechange(event){
      const {name,value}=event.target
         setnewpassword({...newpassword,[name]:value})
      }

    async function handlesubmit(event){
      event.preventDefault()
      setisloading(true)

      const newerrors={
        newpass:validatePassword(newpassword.newpass),
        confirmnewpass:validatePassword(newpassword.confirmnewpass),
        issame: newpassword.newpass===newpassword.confirmnewpass
      }
       seterrors(newerrors)
      if(!newerrors.confirmnewpass.valid || !newerrors.newpass.valid){
           if(!newerrors.newpass.valid) newpassword.newpass=""
           if(!newerrors.confirmnewpass.valid) newpassword.confirmnewpass=""    
            setisloading(false)
            return;

      }
      if(!newerrors.issame){
        seterrors(newerrors)
        setsMessage("password do not match")
        setisloading(false)
        return;
      }
     
    try {
      const response=await axios.post(`${backendUrl}/api/resetpassword`,{newpass:newpassword.newpass,confirmnewpass:newpassword.confirmnewpass,email:email})
        setsMessage(response.data.message)
          if(response.data.success){
            navigate("/sign-in")
              }
    } catch (err) {
      console.error(err)
      setsMessage(err.response.data.message)
    }finally{
      setisloading(false)
    }
    }






      return   <div className="resetpassworddiv">
      <h1>Reset password</h1>
       <form onSubmit={handlesubmit} className="resetform">
      <input type="password" className={!errors.newpass.valid?"formerrorinput":"forminput"} name="newpass" value={newpassword.newpass} onChange={(event)=>{
        handlechange(event);if(!errors.newpass.valid) seterrors({...errors,newpass:{valid:true,message:""}})
      }} placeholder={!errors.newpass.valid? errors.newpass.message : "New Password"} />

      <input type="password" className={!errors.confirmnewpass.valid?"formerrorinput":"forminput"} name="confirmnewpass" value={newpassword.confirmnewpass} onChange={(event)=>{
         handlechange(event); if(!errors.newpass.valid) seterrors({...errors,confirmnewpass:{valid:true,message:""}})
      }} placeholder={!errors.confirmnewpass.valid? errors.confirmnewpass.message :"Confirm New Password"} />
      <span>Minimum 8 characters with atleast one letter and one digit</span>
      <button className="outerlayerbutton" type="submit">{isloading ? <Spinner></Spinner> : sMessage}</button>
       </form>    
      </div>
}

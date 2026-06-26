import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Spinner } from "./buttons"



// eslint-disable-next-line react/prop-types
export function Otpform({email,From}){
    const navigate=useNavigate()
const [otp,setotp]=useState("")
const [error,seterror]=useState(false)
const [sMessage,setsMessage]=useState("Submit")
const [loading,setloading]=useState(false)

function handlechange(e){
    setotp(e.target.value)
}

async function handlesubmit(e){
 e.preventDefault()
 setloading(true)
 
 const newerror=otp.trim()===""
  if(newerror){
    setotp("")
    seterror(newerror)
    setsMessage("OTP is required")
    setloading(false)
    return;
  }


   try{

    const url=From===true ? "http://localhost:3000/api/verifyotp" : "http://localhost:3000/api/verifyresetotp"
     const res=await axios.post(url,{email:email,otp:otp},{withCredentials:true})
    setsMessage(res.data.message)
     if(res.data.success===false) return;
     
     navigate(From===true ? "/home" : '/resetpassword',{state:{email:email}})
   }catch(err){
    console.error(err)
    setsMessage(err.res.data.message)
   }finally{
    setloading(false)
   }
}



    return <div className="otpdiv">
        <h1>Submit OTP</h1>
        <p>OTP was sent to mail {email}</p>
        <form onSubmit={handlesubmit}>
            <input type="text" inputMode="numeric" required className={error.isError ? "formerrorinput":"forminput"} placeholder={"OTP"} maxLength={6} value={otp} onChange={handlechange}/>
            <button className='outerlayerbutton' type="submit">{loading ? <Spinner></Spinner> :sMessage}</button>
        </form> 
    </div>
}
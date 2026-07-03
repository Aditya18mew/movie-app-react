/* eslint-disable react/prop-types */
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Spinner } from "./buttons"
import {backendUrl} from "../utils/config"
import toast from "react-hot-toast"



// eslint-disable-next-line react/prop-types
export function Otpform({email,From}){
    const navigate=useNavigate()
const [otp,setotp]=useState("")
const [error,seterror]=useState(false)
const [sMessage,setsMessage]=useState("Submit")
const [loading,setloading]=useState(false)
const [cooldown,setcooldown]=useState(0)

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
    const url=From===true ? `${backendUrl}/api/verifyotp` : `${backendUrl}/api/verifyresetotp`
     const res=await axios.post(url,{email:email,otp:otp},{withCredentials:true})
     setsMessage(res.data.message)

     if(res.data.success===false){
        toast.error("try again")
         return;
     }
     
     navigate(From===true ? "/home" : '/resetpassword',{state:{email:email}})
   }catch(err){
    console.error(err)
    setsMessage(err.response.data.message)
   }finally{
    setloading(false)
   }
}


async function handleresend(){
   try{
        const url=From===true ? `${backendUrl}/api/resendsignupotp` : `${backendUrl}/api/resendresetotp`
        await axios.post(url,{email:email},{withCredentials:true})
        toast.success("OTP resent")
        setcooldown(60)

       const timer=setInterval(()=>{
            setcooldown(prev=>{
                if(prev<=1) {clearInterval(timer); return 0}
                return prev-1
            })
        },1000)
   }catch(err){
    console.error(err)
     toast.error(err.response.data.message)
   }
}



    return <div className="otpdiv">
        <h1>Submit OTP</h1>
        <p>OTP was sent to mail {`${email.slice(0,3)}****@gmail.com`}</p>
        <form onSubmit={handlesubmit}>
            <input type="text" inputMode="numeric" required className={error ? "formerrorinput":"forminput"} placeholder={"OTP"} maxLength={6} value={otp} onChange={handlechange}/>
            <button className='outerlayerbutton' type="submit">{loading ? <Spinner></Spinner> :sMessage}</button>
        </form>
            <button className='outerlayerbutton'type="button" disabled={cooldown>0} onClick={handleresend}>{cooldown>0 ? `resend in ${cooldown}s`:"resend OTP"}</button>
    </div>
}
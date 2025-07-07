import axios from "axios"
import { useState } from "react"
import { Spinner } from "./buttons"
import { useNavigate } from "react-router-dom"



// eslint-disable-next-line react/prop-types
export function Otpform({email}){
    const navigate=useNavigate()
const [otp,setotp]=useState("")
const [error,seterror]=useState({
    isError:false,
    Errmessage:"OTP is required"
})
const [loading,setloading]=useState(false)

function handlechange(e){
    setotp(e.target.value)
}

async function handlesubmit(e){
 e.preventDefault()
 setloading(true)
 const newerror={
    isError:otp.trim()==="",
    Errmessage:"OTP is required"
 }
  if(newerror.isError){
    setotp("")
    seterror(newerror)
    setloading(false)
    return;
  }
   try{
     const res=await axios.post("http://localhost:5000/api/verifyotp",{email:email,otp:otp})
     if(res.data.success===false){
    seterror({isError:true,Errmessage:res.data.message})
    return;
     }
     navigate("/home")
   }catch(err){
    console.log(err)
   }finally{
    setloading(false)
   }
}



    return <div className="otpdiv">
        <h1>Submit OTP</h1>
        <p>OTP was sent to mail {email}</p>
        <form onSubmit={handlesubmit}>
            <input type="text" className={error.isError ? "formerrorinput":"forminput"} placeholder={error.isError ? error.Errmessage : "OTP"} maxLength={6} value={otp} onChange={handlechange}/>
            <button className='outerlayerbutton' type="submit">{loading ? <Spinner></Spinner> :"Submit"}</button>
        </form> 
    </div>
}
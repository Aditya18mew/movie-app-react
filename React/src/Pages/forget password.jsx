import {useState} from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Otpform } from "../components/otpform"
import { validateEmail } from "../utils/regex"
import { Spinner } from "../components/buttons"
import {backendUrl} from "../utils/config"





export function Forgetpassword(){
    const [success,setsuccess]=useState(false)
    const [email,setemail]=useState("")
    const [error,seterror]=useState({valid:true,message:""})
    const [sMessage,setsMessage]=useState("Submit")
    const [isloading,setisloading]=useState(false)


    function handlechange(event){
        setemail(event.target.value)
    }
    

    async function forgetpasswordhandle(event){
        event.preventDefault()
        setisloading(true) 

       const newerror=validateEmail(email)
        if(!newerror.valid){
           seterror(newerror) 
           setemail("")
           setisloading(false)
            return;
        }

    try{

        const response=await axios.post(`${backendUrl}/api/forgetpassword`,{email:email})
        setsMessage(response.data.message)
        setsuccess(response.data.success)
    }catch(err){
       console.error(err)
       setsMessage(err.response.data.message)
    }finally{
        setisloading(false)
    }
}


    return <>{success ? <Otpform email={email} From={false}></Otpform> : <div className="forgetpassworddiv">
            <h1>Forget password</h1>
            <p>don,t worry reset it with ease</p>
            <form onSubmit={forgetpasswordhandle} className="forgetform">
            <input type="email" className={!error.valid? "formerrorinput":"forminput"} value={email} onChange={handlechange} name="email" id="email" placeholder={!error.valid? error.message:"Email"}/>
            <button className='outerlayerbutton' type="submit">{isloading?<Spinner></Spinner>:sMessage}</button>
            </form>
             <Link className='outerlayerbutton' to="/">Dashboard</Link>
        </div>}</>
}
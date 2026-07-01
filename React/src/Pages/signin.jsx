import { useState } from 'react'
import './../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useFormdata } from '../components/useFormdata'
import { Spinner } from '../components/buttons'
import { validateEmail, validatePassword } from '../utils/regex'
import {backendUrl} from "../utils/config"





 export function Signin() {
    const {formdata,setformdata,handlechange}=useFormdata()
    const navigate=useNavigate()
    const [errors,seterrors]=useState({
        email:{valid:true,message:""},
        password:{valid:true,message:""}
    })
    const [sMessage,setsMessage]=useState("Sign in")
    const [isloading,setisloading]=useState(false)

    function fillDemo(){
      setformdata({ email: 'demo@movieapp.com', password: 'Demo24@cycle' })
    }

    async function submit(event){
        event.preventDefault()
        setisloading(true)
        const newerrors={
            email:validateEmail(formdata.email),
            password:validatePassword(formdata.password)
        }
        seterrors(newerrors)
         if(!errors.email.valid || !errors.password.valid){
          if(!errors.email.valid) formdata.email=""
          if(!errors.password.valid) formdata.password=""
          setisloading(false)
            return;
        }

        try{
            const response= await axios.post(`${backendUrl}/api/signin`,{email:formdata.email,password:formdata.password},{
                withCredentials:true
            })
            setsMessage(response.data.message)
            if(response.data.success){
                 navigate("/home")
            }
        }catch(err){
            console.error(err)
            setsMessage(err.response.data.message)
        }finally{
            setisloading(false)
        }
    }

  return   <div className='outerlayer'>
        <h1 className='heading'>Sign in</h1>
        <p>Stay updated</p>
        <form onSubmit={submit} className='form'>
            <input type='email' className={!errors.email.valid? "formerrorinput":"forminput"} value={formdata.email} onChange={(event)=>{
                handlechange(event)
            }} name="email" id="email" placeholder={!errors.email.valid? errors.email.message:"Email"} required />
            <input type="password" className={!errors.password.valid? "formerrorinput":"forminput"} value={formdata.password} onChange={(event)=>{
                handlechange(event)
            }} name="password" id='password' placeholder={!errors.password.valid? errors.password.message : "Password"} />
             <Link className='formLink' to="/forget-password">Forgot password?</Link>
             <button className='outerlayerbutton' type="submit">{isloading ? <Spinner></Spinner> : sMessage}</button>
        </form>
        <p className='signuptext'>Don,t have an account?</p>
        <Link className='outerlayerbutton' to="/sign-up" >Sign up</Link>
        <button onClick={fillDemo} className='outerlayerbutton'>try it as guest</button>
    </div>
}
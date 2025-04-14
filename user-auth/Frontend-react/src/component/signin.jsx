import { useState } from 'react'
import './../App.css'
import axios from 'axios'
import { useFormdata } from './useFormdata'
import { Forgetpassword } from './forget password'
import { Dashboard } from './dashboard'

 // eslint-disable-next-line react/prop-types
 export function Signin({onSwitch}) {
    const {formdata,handlechange}=useFormdata()
    const [signinsuccess,setsigninsuccess]=useState(false)
    const [forgot,setforgot]=useState(false)
    const [errors,seterrors]=useState({
        email:false,
        password:false
    })

    async function submit(event){
        event.preventDefault()
        const newerrors={
            email:formdata.email.trim()==="",
            password:formdata.password.trim()===""
        }
        seterrors(newerrors)
        if(errors.email || errors.password) return;

        try{
            const response= await axios.post("http://localhost:5000/api/signin",{email:formdata.email,password:formdata.password})
            const {accesstoken,success}=response.data
            setsigninsuccess(success)
            localStorage.setItem("jwt token",accesstoken)
        }catch(err){
            throw new Error(`there is in Error:${err}`)
        }
    }

  return <>{forgot?<Forgetpassword></Forgetpassword>:<>{signinsuccess?<Dashboard   str={"signed in"}></Dashboard>:
    <div className='outerlayer'>
        <h1 className='heading'>Sign in</h1>
        <p>Stay updated</p>
        <form onSubmit={submit} action="/login" className='form'>
            <input type='email' className={errors.email? "formerrorinput":"forminput"} value={formdata.email} onChange={(event)=>{
                handlechange(event)
                seterrors(prev=>({...prev,[event.target.name]:false}))
            }} name="email" id="email" placeholder={errors.email? "❗ Email is required":"Email"} required />
            <input type="password" className={errors.password? "formerrorinput":"forminput"} value={formdata.password} onChange={(event)=>{
                handlechange(event)
                seterrors(prev=>({...prev,[event.target.name]:false}))
            }} name="password" id='password' placeholder={errors.password? "❗ Password is required" : "Password"} />
        </form>
        <a onClick={()=>{
          setforgot(true)
        }}>Forgot password?</a>
        <button onClick={submit}>Sign in</button>
        <p className='differencecreater'>or</p>
        <div>Sign in with Google </div>
        <p className='signuptext'>Don,t have an account?</p>
        <button style={{marginTop:"40px"}} onClick={onSwitch}  className='signup'>Sign up</button>
    </div>}</>}</>
}
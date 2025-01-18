import { useFormdata } from '../component/useFormdata'
import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Forgetpassword } from './forget password'
import { Dashboard } from '../component/dashboard'

 // eslint-disable-next-line react/prop-types
 export function Signin({onSwitch}) {
  const {formdata,handlechange}=useFormdata()
  const [signinsuccess,setsigninsuccess]=useState(false)
  const [forgot,setforgot]=useState(false)

 async function submit(event){
  event.preventDefault()
   try{
const response= await axios.post("http://localhost:5000/api/signin",{email:formdata.email,password:formdata.password})
const {accesstoken,success}=response.data
setsigninsuccess(success)
localStorage.setItem("jwt token",accesstoken)
   }catch(err){
    console.log(err)
   }
}

  return <>{forgot?<Forgetpassword></Forgetpassword>:<>{signinsuccess?<Dashboard   str={"in"}></Dashboard>:
  <div className='outerlayer'>
    <h1 className='heading'>Sign in</h1>
    <p>Stay updated</p>
    <form onSubmit={submit} action="/login" className='form'>
    <input type='email' value={formdata.email} onChange={handlechange} name="email" id="email" placeholder='Email' required />
    <input type="password" value={formdata.password} onChange={handlechange} name="password" id='password' placeholder='Password'/>
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

import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Forgetpassword } from './forget password'

 // eslint-disable-next-line react/prop-types
 export function Signin({onSwitch}) {
const [formdata,setformdata]=useState({
  email:"",
  password:""
})
const [signinsuccess,setsigninsuccess]=useState(false)
const [forgot,setforgot]=useState(false)


function handlechange(event){
   const {name,value}=event.target
   setformdata({...formdata,[name]:value})
}
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

  return <>{forgot?<Forgetpassword></Forgetpassword>:<>{signinsuccess?<div className='homepage'>
    <div className='icon'></div>
<h1>Success!</h1>
<p>You have successfully signed in.</p>
<button onClick={()=>{
  window.location.href="/home"
}}>Go to dashboard</button>
  </div>:
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
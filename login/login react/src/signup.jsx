
import { useState } from 'react'
import './App.css'
import axios from 'axios'

 // eslint-disable-next-line react/prop-types
 export function Signup({onSwitch}) {
const [formdata,setformdata]=useState({
  email:"",
  password:""
})
const [signupsuccess,setsignupsuccess]=useState(false)

function handlechange(event){
   const {name,value}=event.target
   setformdata({...formdata,[name]:value})
}
async function submit(event){
  event.preventDefault()
   try{
      const response=await axios.post("http://localhost:5000/api/signup",{email:formdata.email,password:formdata.password})
setsignupsuccess(response.data.success)
   }catch(err){
    console.log(err)
   }
   
}
  return <>{signupsuccess?<div className='homepage'>
    <div className='icon'></div>
<h1>Success!</h1>
<p>You have successfully signed up.</p>
<button onClick={()=>{
   window.location.href="/home"
}}>Go to dashboard</button>
  </div>:<div className='outerlayer'>
    <h1 className='heading'>Sign up</h1>
    <p>Stay updated</p>
    <form onSubmit={submit} action="/login" className='form'>
    <input type="text" value={formdata.email} onChange={handlechange} name="email" id="email" placeholder='Email' required/>
    <input type="password" value={formdata.password} onChange={handlechange} name="password" id='password' placeholder='Create password'/>
    </form>
    <button onClick={submit}>Sign up</button>
    <p className='differencecreatersignup'>or</p>
    <div>Sign up with Google </div>
    <p className='signuptextsignup'>Already have an account?</p>
    <button style={{marginTop:"40px"}} onClick={onSwitch} className='signin'>Sign in</button>
  </div>}</>
}

import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useFormdata } from '../component/useFormdata'
import { Dashboard } from '../component/dashboard'


 // eslint-disable-next-line react/prop-types
 export function Signup({onSwitch}) {
const {formdata,handlechange}=useFormdata()
const [signupsuccess,setsignupsuccess]=useState(false)

async function submit(event){
  event.preventDefault()
   try{
      const response=await axios.post("http://localhost:5000/api/signup",{email:formdata.email,password:formdata.password})
setsignupsuccess(response.data.success)
   }catch(err){
    console.log(err)
   }
   
}
  return <>{signupsuccess?<Dashboard str={"up"}></Dashboard>:<div className='outerlayer'>
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
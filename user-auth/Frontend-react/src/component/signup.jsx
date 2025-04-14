import { useState } from 'react'
import './../App.css'
import axios from 'axios'
import { useFormdata } from './useFormdata'
import { Dashboard } from './dashboard'



 // eslint-disable-next-line react/prop-types
 export function Signup({onSwitch}) {
      const {formdata,handlechange}=useFormdata()
      const [signupsuccess,setsignupsuccess]=useState(false)
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
            const response=await axios.post("http://localhost:5000/api/signup",{email:formdata.email,password:formdata.password})
            setsignupsuccess(response.data.success)
        }catch(err){
            throw new Error(`there is in Error:${err}`)
        }   
      }


  return <>{signupsuccess?<Dashboard str={"signed up"}></Dashboard>:
      <div className='outerlayer'>
          <h1 className='heading'>Sign up</h1>
          <p>Stay updated</p>
          <form onSubmit={submit} action="/login" className='form'>
              <input type="text" className={errors.email? "formerrorinput":"forminput"} value={formdata.email} onChange={(event)=>{
                handlechange(event)
                seterrors(prev=>({...prev,[event.target.name]:false}))
              }} name="email" id="email" placeholder={errors.password? "❗ Email is required" : "Email"} required/>
              <input type="password" className={errors.password? "formerrorinput":"forminput"} value={formdata.password} onChange={(event)=>{
                handlechange(event)
                seterrors(prev=>({...prev,[event.target.name]:false}))
              }} name="password" id='password' placeholder={errors.password? "❗ Password is required" : "Create Password"}/>
          </form>
          <button onClick={submit}>Sign up</button>
          <p className='differencecreatersignup'>or</p>
          <div>Sign up with Google </div>
          <p className='signuptextsignup'>Already have an account?</p>
          <button style={{marginTop:"40px"}} onClick={onSwitch} className='signin'>Sign in</button>
      </div>}
      </>
}
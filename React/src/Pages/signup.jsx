import { useState } from 'react'
import './../App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useFormdata } from '../components/useFormdata'
import { Spinner } from '../components/buttons'
import { Otpform } from '../components/otpform'
import { validateEmail, validatePassword } from '../utils/regex'
import {backendUrl} from "../utils/config"




 export function Signup() {
      const {formdata,handlechange}=useFormdata()
      const [signupsuccess,setsignupsuccess]=useState(false)
      const [errors,seterrors]=useState({
        email:{valid:true,message:""},
        password:{valid:true,message:""}
    })
      const [sMessage,setsMessage]=useState("Sign up")
      const [isloading,setisloading]=useState(false)


      async function submit(event){
        event.preventDefault()
        setisloading(true)

        const newerrors={
           email:validateEmail(formdata.email),
           password:validatePassword(formdata.password)
        }

        seterrors(newerrors)

        if(!newerrors.email.valid || !newerrors.password.valid){
          if(!newerrors.email.valid) formdata.email=""
          if(!newerrors.password.valid) formdata.password=""
          setisloading(false)
          return;
        }

        try{
            const response=await axios.post(`${backendUrl}/api/signup`,{email:formdata.email,password:formdata.password})
            setsignupsuccess(response.data.message)
            setsignupsuccess(response.data.success)
        }catch(err){
           setsMessage(err.response.data.message)
        }finally{
           setisloading(false)
        }
      }


  return  <>{signupsuccess ? <Otpform From={true} email={formdata.email}></Otpform> : <div className='outerlayer'>
          <h1 className='heading'>Sign up</h1>
          <p>Stay updated</p>
          <form onSubmit={submit} className='form'>
              <input type="text" className={!errors.email.valid? "formerrorinput":"forminput"} value={formdata.email} onChange={(event)=>{
                handlechange(event); if(!errors.email.valid) seterrors({...errors,email:{valid:true,message:""}})
              }} name="email" id="email" placeholder={!errors.email.valid? errors.email.message : "Email"} required/>

              <input type="password"  className={!errors.password.valid? "formerrorinput":"forminput"} value={formdata.password} onChange={(event)=>{
                handlechange(event);if(!errors.password.valid) seterrors({...errors,email:{valid:true,message:""}})
              }} name="password" id='password' placeholder={!errors.password.valid? errors.password.message : "Create Password"}/>
              <button className='outerlayerbutton' type="submit">{isloading ? <Spinner></Spinner> : sMessage}</button>
          </form>
          <p className='text'>Already have an account?</p>
          <Link className='outerlayerbutton' to="/sign-in" >Sign in</Link>
      </div>}
    </>
}
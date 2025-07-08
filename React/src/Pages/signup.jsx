import { useState } from 'react'
import './../App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useFormdata } from '../components/useFormdata'
import { Spinner } from '../components/buttons'
import { Otpform } from '../components/otpform'




 export function Signup() {
      const {formdata,handlechange}=useFormdata()
      const [signupsuccess,setsignupsuccess]=useState(false)
      const [errors,seterrors]=useState({
        email:false,
        password:false
    })
    const [isloading,setisloading]=useState(false)


      async function submit(event){
        event.preventDefault()
        setisloading(true)
        const newerrors={
            email:formdata.email.trim()==="",
            password:formdata.password.trim()===""
        }
        seterrors(newerrors)
        if(errors.email || errors.password){
          setisloading(false)
          return;
        }

        try{
            const response=await axios.post("http://localhost:3000/api/signup",{email:formdata.email,password:formdata.password})
            setsignupsuccess(response.data.success)
        }catch(err){
            throw new Error(`there is in Error:${err}`)
        }finally{
           setisloading(false)
        }
      }


  return  <>{signupsuccess ? <Otpform From={true} email={formdata.email}></Otpform> : <div className='outerlayer'>
          <h1 className='heading'>Sign up</h1>
          <p>Stay updated</p>
          <form onSubmit={submit} className='form'>
              <input type="text" className={errors.email? "formerrorinput":"forminput"} value={formdata.email} onChange={(event)=>{
                handlechange(event)
                seterrors(prev=>({...prev,[event.target.name]:false}))
              }} name="email" id="email" placeholder={errors.password? "❗ Email is required" : "Email"} required/>
              <input type="password" className={errors.password? "formerrorinput":"forminput"} value={formdata.password} onChange={(event)=>{
                handlechange(event)
                seterrors(prev=>({...prev,[event.target.name]:false}))
              }} name="password" id='password' placeholder={errors.password? "❗ Password is required" : "Create Password"}/>
              <button className='outerlayerbutton' type="submit">{isloading ? <Spinner></Spinner> : "Sign up"}</button>
          </form>
          <p className='signuptextsignup'>Already have an account?</p>
          <Link className='outerlayerbutton' to="/sign-in" >Sign in</Link>
      </div>}
    </>
}
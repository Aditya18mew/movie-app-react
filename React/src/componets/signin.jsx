import { useState } from 'react'
import './../App.css'
import axios from 'axios'
import { useFormdata } from './useFormdata'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from './buttons'




 export function Signin() {
    const {formdata,handlechange}=useFormdata()
    const navigate=useNavigate()
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
            const response= await axios.post("http://localhost:3000/api/signin",{email:formdata.email,password:formdata.password},{
                withCredentials:true
            })
            if(response.data.success){
                 navigate("/home")
            }
        }catch(err){
            throw new Error(`there is in Error:${err}`)
        }finally{
            setisloading(false)
        }
    }

  return   <div className='outerlayer'>
        <h1 className='heading'>Sign in</h1>
        <p>Stay updated</p>
        <form onSubmit={submit} className='form'>
            <input type='email' className={errors.email? "formerrorinput":"forminput"} value={formdata.email} onChange={(event)=>{
                handlechange(event)
                seterrors(prev=>({...prev,[event.target.name]:false}))
            }} name="email" id="email" placeholder={errors.email? "❗ Email is required":"Email"} required />
            <input type="password" className={errors.password? "formerrorinput":"forminput"} value={formdata.password} onChange={(event)=>{
                handlechange(event)
                seterrors(prev=>({...prev,[event.target.name]:false}))
            }} name="password" id='password' placeholder={errors.password? "❗ Password is required" : "Password"} />
             <Link className='formLink' to="/forget-password">Forgot password?</Link>
             <button className='outerlayerbutton' type="submit">{isloading ? <Spinner></Spinner> : "Sign in"}</button>
        </form>
        <p className='signuptext'>Don,t have an account?</p>
        <Link className='outerlayerbutton' to="/sign-up" >Sign up</Link>
    </div>
}
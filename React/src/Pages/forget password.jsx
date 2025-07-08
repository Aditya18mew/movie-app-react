import {useReducer, useState} from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Spinner } from "../components/buttons"
import { Otpform } from "../components/otpform"


const HANDLECHANGE="HANDLECHANGE"
const SETLOADING="SETLOADING"
const SETMESSAGE="SETMESSAGE"

const defaultstate={
    email:"",
    message:"",
    loading:false,
}
const reducer=(state,action)=>{
if(action.type===HANDLECHANGE){
         return {...state,email:action.value}
}
if(action.type===SETLOADING){
    return {...state,loading:action.value}
}
if(action.type===SETMESSAGE){
    return {...state,message:action.value}
}
throw new Error(`action-${action.type} is not there`)
}

export function Forgetpassword(){
    const [state,dispatch]=useReducer(reducer,defaultstate)
    const [emptyerror,setemptyerror]=useState(false)
    const [success,setsuccess]=useState(false)


    function handlechange(event){
        setemptyerror(false)
        dispatch({type:HANDLECHANGE,value:event.target.value})
    }
    

    async function forgetpasswordhandle(event){
        event.preventDefault()
        dispatch({type:SETLOADING,value:true})
        if(state.email.trim()===""){
            dispatch({type:SETLOADING,value:false})  
            setemptyerror(true)
            return
        }
    try{
        const response=await axios.post("http://localhost:3000/api/forgetpassword",{email:state.email})
        dispatch({type:SETLOADING,value:false})
        setsuccess(response.data.success)
    }catch(err){
        dispatch({type:SETLOADING,value:false})
        dispatch({type:SETMESSAGE,value:`Error:Unable to send reset link`})
        throw new Error(`there is a Error:${err}`)
    }
}


    return <>{success ? <Otpform email={state.email} From={false}></Otpform> : <div className="forgetpassworddiv">
            <h1>Forget password</h1>
            <p>don,t worry reset it with ease</p>
            <form onSubmit={forgetpasswordhandle} className="forgetform">
            <input type="email" className={emptyerror? "formerrorinput":"forminput"} value={state.email} onChange={handlechange} name="email" id="email" placeholder={emptyerror? "❗ Email is required":"Email"}/>
            <button className='outerlayerbutton' type="submit">{state.loading?<Spinner></Spinner>:"submit"}</button>
            <p>{state.message}</p>
            </form>
             <Link className='outerlayerbutton' to="/">Dashboard</Link>
        </div>}</>
}
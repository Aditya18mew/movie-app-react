import {useReducer} from "react"
import axios from "axios"
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

    function handlechange(event){
        dispatch({type:HANDLECHANGE,value:event.target.value})
    }

    async function forgetpasswordhandle(event){
        event.preventDefault()
        dispatch({type:SETLOADING,value:true})

    try{
        const response=await axios.post("http://localhost:5000/api/forgetpassword",{email:state.email})
        dispatch({type:SETLOADING,value:false})
        dispatch({type:SETMESSAGE,value:response.data.message})
    }catch(err){
        dispatch({type:SETLOADING,value:false})
        dispatch({type:SETMESSAGE,value:`Error:Unable to send reset link`})
        throw new Error(`there is a Error:${err}`)
    }
}


    return <div className="forgetpassworddiv">
            <h1>Forget password</h1>
            <form action="forgot" className="form">
            <input type="email" value={state.email} onChange={handlechange} name="email" id="email" placeholder="Email"/>
            <button onClick={forgetpasswordhandle}>{state.loading?"Sending...":"Send Reset Link"}</button>
            </form>
            <p>{state.message}</p>
   {/*optional */}  <button onClick={()=>window.location.href="/"}>go to dashboard</button>
        </div>
}
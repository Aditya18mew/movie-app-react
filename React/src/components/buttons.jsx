import axios from "axios"
import { useNavigate } from "react-router-dom"
import {backendUrl} from "../utils/config"




export function Spinner(){
    return <div className="spinner"></div>
}


export function Logout(){
 const navigate=useNavigate()

      async function logout(){
    try{
      const res=await axios.post(`${backendUrl}/api/logout`,null,{
        withCredentials:true
      })
      if(res.data.success){
        navigate("/")
      }
    }catch(err){
      console.log(err)
    }
  }
  
  return <button onClick={logout} className="div_btn">Logout</button>
}





import axios from "axios"
import { useNavigate } from "react-router-dom"
import {backendUrl} from "../utils/config"
import toast from "react-hot-toast"




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
      console.error(err)
      toast.error("Something went wrong")
    }
  }
  
  return <button onClick={logout} className="div_btn">Logout</button>
}





import axios from "axios"
import { useNavigate } from "react-router-dom"



export function Spinner(){
    return <div className="spinner"></div>
}


export function Logout(){
 const navigate=useNavigate()

      async function logout(){
    try{
      const res=await axios.post("http://localhost:3000/api/logout",null,{
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

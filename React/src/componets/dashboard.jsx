import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"




export function Dashboard(){
   const navigate=useNavigate()
    async function checkauthorization(){
    try{
     const res=await axios.get("http://localhost:3000/api/checkauthorization", {
     withCredentials:true
     })
     if(res.data.success===false){
       navigate("/sign-in")
     }
     if(res.data.success===true){
      navigate("/home")
     }
    }catch(err){
      console.log(err)
    }
 }

 useEffect(()=>{
   checkauthorization()
 },[])

   return (
    <div className='homepage'>
        <div className='icon'></div>
        <h1>Success!</h1>

  </div>
    )
       
    
}
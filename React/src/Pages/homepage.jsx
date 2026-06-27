import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Play } from "../utils/playful"
import {backendUrl} from "../utils/config"




export function HomePage(){
   const navigate=useNavigate()
    function navigatetologin(){
      navigate("/sign-in")
    }

     
    


    async function checkauthorization(){
    try{
     const res=await axios.get(`${backendUrl}/api/checkauthorization`, {
     withCredentials:true
     })
     if(res.data.success===true){
      navigate("/home")
     } 
    }catch(err){
      console.error(err)
    }
 }

 useEffect(()=>{
   checkauthorization()
 },[])

   return (
    <>
     <nav className="homenavbar">
    <div className="homeheader">
      <div className="title">Movie Search</div>
      <div className="bar">
        <div>about</div>
        <div className="loginbutton" onClick={navigatetologin}>Login</div> 
      </div>
    </div>
  </nav>
  <div className="homebody">
    <Play></Play>
  </div> 
  </>
    )
       
    
}
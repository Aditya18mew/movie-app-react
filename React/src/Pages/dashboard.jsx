import { useState } from "react"
import { MovieProvider } from "../components/MovieProvider"
import { MemorizedNavbar } from "../components/Navbar"
import { MemorizedMiddleware } from "../components/middleware"

export function Dashboard(){

   const [isloading,setisloading]=useState(true)
   const [iserror,setiserror]=useState(false)
   const [message,setmessage]=useState("") 

    return <div className='maincotainer' id='mainbody'>
<MovieProvider {...{setisloading,setiserror,setmessage}}>
<MemorizedNavbar {...{setisloading,setiserror,setmessage}}></MemorizedNavbar>
{ isloading ? <div className='loading'>{iserror ? <div className='showerror'>
 {message && <h4>{message}</h4>}
 <div className='refreshicon' onClick={()=>{
   window.location.href="/home"
 }}></div>
</div>:<div className='loadicon'></div>}</div> :<MemorizedMiddleware></MemorizedMiddleware>}
</MovieProvider>
 </div>
}
import { useState } from "react"
import { MovieProvider } from "../components/MovieProvider"
import { MemorizedNavbar } from "../components/Navbar"
import { MemorizedMiddleware } from "../components/middleware"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "../components/skeleton"

export function Home(){
   const navigate=useNavigate()
   const [isloading,setisloading]=useState(true)
   const [iserror,setiserror]=useState(false)



    return <div className='maincotainer' id='mainbody'>
<MovieProvider {...{setisloading,setiserror}}>
<MemorizedNavbar {...{setisloading,setiserror}}></MemorizedNavbar>
{iserror ? (
           <div className="error"><div className='showerror'>
                  <div className='refreshicon' onClick={() => navigate(0)} />
                  </div></div>
 ) : isloading ? (
                 <Skeleton></Skeleton>
                ) : (
                   <MemorizedMiddleware></MemorizedMiddleware>
                )}
</MovieProvider>
 </div>
}
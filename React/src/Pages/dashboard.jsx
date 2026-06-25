import { useState } from "react"
import { MovieProvider } from "../components/MovieProvider"
import { MemorizedNavbar } from "../components/Navbar"
import { MemorizedMiddleware } from "../components/middleware"
import { useNavigate } from "react-router-dom"

export function Dashboard(){
   const navigate=useNavigate()
   const [isloading,setisloading]=useState(true)
   const [iserror,setiserror]=useState(false)
   const [message,setmessage]=useState("") 



    return <div className='maincotainer' id='mainbody'>
<MovieProvider {...{setisloading,setiserror,setmessage}}>
<MemorizedNavbar {...{setisloading,setiserror,setmessage}}></MemorizedNavbar>
{/* { isloading ? <div className='loading'>{iserror ? <div className='showerror'>
 {message && <h4>{message}</h4>}
 <div className='refreshicon' onClick={()=>navigate(0)}></div>
</div>:<div className='loadicon'></div>}</div> :<MemorizedMiddleware></MemorizedMiddleware>} */}
{iserror ? (
           <div className="error"><div className='showerror'>
                  {message && <h4>{message}</h4>}<div className='refreshicon' onClick={() => navigate(0)} />
                  </div></div>
 ) : isloading ? (
                    <div className='loading'>
                        <div className='loadicon' />
                    </div>
                ) : (
                    <MemorizedMiddleware />
                )}
</MovieProvider>
 </div>
}


import { useState } from 'react'
import './App.css'
import { MemorizedMiddleware } from './componets/middleware'
import { MovieProvider } from './componets/MovieProvider'
import { MemorizedNavbar } from './componets/Navbar'








function App() {
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

export default App

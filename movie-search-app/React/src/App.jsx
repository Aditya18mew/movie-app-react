

import { useState } from 'react'
import './App.css'
import { MemorizedMiddlemen } from './componets/middlemen'
import { MovieSearch } from './componets/Moviecontext'
import { MemorizedNavbar } from './componets/Navbar'







function App() {
const [isloading,setisloading]=useState(true)
const [iserror,setiserror]=useState(false)
const [message,setmessage]=useState("")
  return <div className='maincotainer'>
 <MovieSearch {...{setisloading,setiserror,setmessage}}>
 <MemorizedNavbar {...{setisloading,setiserror,setmessage}}></MemorizedNavbar>
{ isloading ? <div className='loading'>{iserror ? <div className='showerror'>
  {message && <h4>{message}</h4>}
  <div className='refreshicon' onClick={()=>{
    window.location.href="/home"
  }}></div>
</div>:<div className='loadicon'></div>}</div> :<MemorizedMiddlemen></MemorizedMiddlemen>}
 </MovieSearch>
  </div>
}

export default App

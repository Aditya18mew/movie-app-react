import { useState } from 'react'
import './App.css'
import { MemorizedMiddleware } from './componets/middleware'
import { MovieProvider } from './componets/MovieProvider'
import { MemorizedNavbar } from './componets/Navbar'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Signin } from './componets/signin'
import { Signup } from './componets/signup'
import { Resetpassword } from './componets/resetpassword'
import { Forgetpassword } from './componets/forget password'
import { Dashboard } from './componets/dashboard'








function App() {
 
const [isloading,setisloading]=useState(true)
const [iserror,setiserror]=useState(false)
const [message,setmessage]=useState("")




 return (
   <Router>
    <Routes>
     <Route path='/' element={<div className='cotainer'><Dashboard></Dashboard></div>}></Route>
    <Route path='/sign-in' element={<div className='cotainer'><Signin/></div>}></Route>
    <Route path='/sign-up' element={ <div className='cotainer'><Signup/></div>}></Route>
    <Route path='/forget-password' element={ <div className='cotainer'><Forgetpassword></Forgetpassword></div>}></Route>
    <Route path='/resetpassword' element={<div className='cotainer'><Resetpassword></Resetpassword></div>}></Route>

    
    <Route path='/home' element={<div className='maincotainer' id='mainbody'>
<MovieProvider {...{setisloading,setiserror,setmessage}}>
<MemorizedNavbar {...{setisloading,setiserror,setmessage}}></MemorizedNavbar>
{ isloading ? <div className='loading'>{iserror ? <div className='showerror'>
 {message && <h4>{message}</h4>}
 <div className='refreshicon' onClick={()=>{
   window.location.href="/home"
 }}></div>
</div>:<div className='loadicon'></div>}</div> :<MemorizedMiddleware></MemorizedMiddleware>}
</MovieProvider>
 </div>}></Route>
    </Routes>
   </Router>
  );


}
export default App

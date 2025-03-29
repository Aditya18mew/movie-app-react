
import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Signin } from './component/signin';
import { Signup } from './component/signup';
import { Resetpassword } from './component/resetpassword';







function App() {
   const [showsignin,setshowsignin]=useState(true)

 return (
   <Router>
    <Routes>
     <Route path='/' element={ <div>
      {showsignin ? (
        <Signin  onSwitch={()=>{setshowsignin(false)}} />
      ) : (
        <Signup onSwitch={()=>{setshowsignin(true)}} />
      )}
    </div>}></Route>
    <Route path='/resetpassword' element={<Resetpassword></Resetpassword>}></Route>
    </Routes>
   </Router>
  );




}
export default App

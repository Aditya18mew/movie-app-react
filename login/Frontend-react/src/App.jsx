
import { useState } from 'react'
import './App.css'
import { Signin } from './signin'
import { Signup } from './signup'
function App() {
   const [showsignin,setshowsignin]=useState(true)

 return (
    <div>
      {showsignin ? (
        <Signin  onSwitch={()=>{setshowsignin(false)}} />
      ) : (
        <Signup onSwitch={()=>{setshowsignin(true)}} />
      )}
    </div>
  );




}
export default App

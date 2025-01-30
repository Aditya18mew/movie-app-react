
import { useState } from 'react'
import './App.css'
import { Signin } from './component/signin';
import { Signup } from './component/signup';





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

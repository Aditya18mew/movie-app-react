

import { useState } from 'react'
import './App.css'
import { MemorizedMiddlemen } from './componets/middlemen'
import { MovieSearch } from './componets/Moviecontext'
import { MemorizedNavbar } from './componets/Navbar'






function App() {

  const [isloading,setisloading]=useState(true)
  return <div className='maincotainer'>
 <MovieSearch {...{setisloading}}>
 <MemorizedNavbar></MemorizedNavbar>
{ isloading ? <div className='loading'><div className='loadicon'></div></div> :<MemorizedMiddlemen></MemorizedMiddlemen>}
 </MovieSearch>
  </div>
}

export default App

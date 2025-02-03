

import './App.css'
import { MemorizedMiddlemen } from './componets/middlemen'
import { MovieSearch } from './componets/Moviecontext'
import { MemorizedNavbar } from './componets/Navbar'





function App() {


  return <div className='maincotainer'>
 <MovieSearch>
  <MemorizedNavbar></MemorizedNavbar>
  <MemorizedMiddlemen></MemorizedMiddlemen>
 </MovieSearch>
  </div>
}

export default App

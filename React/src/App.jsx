import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Resetpassword } from './Pages/resetpassword'
import { Forgetpassword } from './Pages/forget password'
import { Dashboard } from './Pages/dashboard';
import { HomePage } from './Pages/homepage';
import { Signup } from './Pages/signup';
import {Signin} from "./Pages/signin"
import { WishList } from './Pages/wishlist';
import { Favorites } from './Pages/favorites';
import { Trending } from './Pages/trending';
import {MovieDetails } from './Pages/moviedetails';











function App() {
 
 return (
<Router>
  <Routes>
    <Route path='/' element={<div className='homepage'><HomePage></HomePage></div>}></Route>
    <Route path='/sign-in' element={<div className='sContainer'><Signin/></div>}></Route>
    <Route path='/sign-up' element={ <div className='sContainer'><Signup/></div>}></Route>
    <Route path='/forget-password' element={ <div className='sContainer'><Forgetpassword></Forgetpassword></div>}></Route>
    <Route path='/resetpassword' element={<div className='sContainer'><Resetpassword></Resetpassword></div>}></Route>
    <Route path='/home' element={<Dashboard></Dashboard>}></Route>
    <Route path='/trending' element={<Trending></Trending>}></Route>
    <Route path='/wishlist' element={<WishList></WishList>}></Route>
    <Route path='/favorites' element={<Favorites></Favorites>}></Route>
    <Route path='/movie/:id' element={<MovieDetails></MovieDetails>}></Route>
  </Routes>
</Router>
  );


}
export default App

import axios from "axios"
import {memo, useEffect, useState } from "react"
import { useCustomcontext } from "./useCustomcontext"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import {Logout} from "./buttons"





 // eslint-disable-next-line react/prop-types
 function Navbar({setisloading,setmessage,setiserror}){
  const [search,setsearch]=useState({
    name:"",
    value:""
  })
  const navigate=useNavigate()
  const {setcurrent}=useCustomcontext()
  const debounce=useDebounce(search.value,500)

    function handlechange(event){
       const {name,value}=event.target
       setsearch({name:name,value:value})
    }
    
   const fetchsearch=useCallback(
    async (name)=>{
        try{
        setisloading(true)
        setiserror(false)
    const response=await axios.post("http://localhost:3000/api/searchmovie",{name:name},{
      withCredentials:true
    })
       if(!response.data.success){
          setiserror(true)
          setmessage("Network error")
          return
       }
        setisloading(false)
        setcurrent(response.data.arr)
        }catch(err){
            setiserror(true)
            setmessage(`Network error`)
        }
    },[])

     function navigatetoWishList(){
    navigate("/WishList")
   }
   function navigatetoFavorites(){
    navigate("/Favorites")
   }
  function navigatetoHome(){
    navigate("/home")
   }



useEffect(()=>{
if(debounce){
    fetchsearch(debounce)
}
},[debounce,fetchsearch])
  


    return <nav className="navbar">
        <h2 onClick={navigatetoHome}>Movie search</h2>
   <div className="div_input"> <input type="search" value={search.value} id="search" onChange={handlechange} name="search" placeholder="Search"/>
        <div className="input-with-icon"></div></div>
        <button onClick={navigatetoWishList} className="div_btn">Wishlist</button>
        <button onClick={navigatetoFavorites} className="div_btn">Favorites</button>
        <Logout></Logout>
    </nav>
}


function useDebounce(value,delay){
  const [debounce,setdebounce]=useState(value)

  useEffect(()=>{
    const timer=setTimeout(()=>{
          setdebounce(value)
    },delay)

  return ()=>clearTimeout(timer)
  },[value,delay])

  return debounce
}



export const MemorizedNavbar=memo(Navbar)
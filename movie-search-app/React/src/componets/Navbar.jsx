import axios from "axios"
import {memo, useEffect, useState } from "react"
import { useCustomcontext } from "./usecustomcontext"
import { useCallback } from "react"





 // eslint-disable-next-line react/prop-types
 function Navbar({setisloading,setmessage,setiserror}){
  const [search,setsearch]=useState({
    name:"",
    value:""
  })
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
    const response=await axios.post("http://localhost:5000/api/searchmovie",{name:name})
       if(!response.data.success){
          setiserror(true)
          setmessage("Network error")
          return
       }
        setcurrent(response.data.arr)
        setisloading(false)
        }catch(err){
            setiserror(true)
            setmessage(`Network error`)
        }
    },[]) 

useEffect(()=>{
if(debounce){
    fetchsearch(debounce)
}
},[debounce,fetchsearch])
  


    return <nav className="navbar">
        <h2 onClick={()=>{
          window.location.href="/home"
        }}>Movie search</h2>
     <input type="search" value={search.value} id="search" onChange={handlechange} name="search" className="input-with-icon" />
        <h3>Wishlist</h3>
        <h3>Favorites</h3>
        
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
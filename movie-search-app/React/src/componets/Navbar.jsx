import axios from "axios"
import {memo, useState } from "react"
import { useCustomcontext } from "./usecustomcontext"




 function Navbar(){
  const [search,setsearch]=useState({
    name:"",
    value:""
  })
  const {setcurrent}=useCustomcontext()

    function handlechange(event){
       const {name,value}=event.target
       setsearch({name:name,value:value})
       fetchsearch(search.value)
    }

    async function fetchsearch(name){
        try{
    const response=await axios.post("http://localhost:5000/api/searchmovie",{name:name})
    console.log(response.data.arr)
    setcurrent(response.data.arr)
        }catch(err){
            console.log(err)
        }
    }

  


    return <nav className="navbar">
        <h2>Movie search</h2>
     <input type="search" value={search.value} id="search" onChange={handlechange} name="search" className="input-with-icon" />
        <h3>Wishlist</h3>
        <h3>Favorites</h3>
        
    </nav>
}

export const MemorizedNavbar=memo(Navbar)
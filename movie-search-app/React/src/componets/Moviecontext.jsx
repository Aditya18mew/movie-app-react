
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Moviecontext } from "./usecustomcontext";






// eslint-disable-next-line react/prop-types
export function MovieSearch({setisloading,children,setiserror,setmessage}){
const [current,setcurrent]=useState([])


const fetchpopularmovies=useCallback(
  async (current)=> {
    try{
  const response=await axios.post("http://localhost:5000/api/popularmovies",{name:"aditya"})
     if(!response.data.success){
      setiserror(true)
      setmessage("Netwrok error")
      return
     }
  setcurrent([...current,...response.data.arr])
  setisloading(false)
    }catch(err){
      setiserror(true)
      setmessage(`Network error`)
    }
},[])

useEffect(()=>{
    fetchpopularmovies(current)
},[])




return <Moviecontext.Provider  value={{current,setcurrent,fetchpopularmovies}}>
{children}
</Moviecontext.Provider>
}
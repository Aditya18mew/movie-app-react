
import { useEffect, useState } from "react";
import axios from "axios";
import { Moviecontext } from "./usecustomcontext";






// eslint-disable-next-line react/prop-types
export function MovieSearch({setisloading,children}){
const [current,setcurrent]=useState([])



async function fetchpopularmovies() {
    try{
  const response=await axios.post("http://localhost:5000/api/popularmovies",{name:"aditya"})
     if(!response.data.success){
      setisloading(true)
      return
     }
  setcurrent([...current,...response.data.arr])
  setisloading(false)
    }catch(err){
      setisloading(true)
         console.log(err)
    }
}
useEffect(()=>{
    fetchpopularmovies()
},[])




return <Moviecontext.Provider  value={{current,setcurrent,fetchpopularmovies}}>
{children}
</Moviecontext.Provider>
}
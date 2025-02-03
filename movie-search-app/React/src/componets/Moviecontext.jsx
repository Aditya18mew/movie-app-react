
import { useEffect, useState } from "react";
import axios from "axios";
import { Moviecontext } from "./usecustomcontext";






// eslint-disable-next-line react/prop-types
export function MovieSearch({children}){
const [current,setcurrent]=useState([])



async function fetchpopularmovies() {
    try{
  const response=await axios.post("http://localhost:5000/api/popularmovies",{name:"aditya"})
  setcurrent([...current,...response.data.arr])
    }catch(err){
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

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { MovieContext } from "./useCustomcontext";








// eslint-disable-next-line react/prop-types
export function MovieProvider({setisloading,children,setiserror,setmessage}){
const [current,setcurrent]=useState([])
const [isfetching,setisfetching]=useState(false)


const fetchpopularmovies=useCallback(
  async (current)=> {
    try{
      setisfetching(true)
  const response=await axios.get("http://localhost:3000/api/popularmovies",{
    withCredentials:true
  })
     setcurrent([...current,...response.data.arr])
     setisloading(false)
     setisfetching(false)
    }catch(err){
     setiserror(true)
      setmessage(`Network error`)
    }
},[])

useEffect(()=>{
    fetchpopularmovies(current)
},[])




return <MovieContext.Provider  value={{isfetching,current,setcurrent,fetchpopularmovies}}>
{children}
</MovieContext.Provider>
}
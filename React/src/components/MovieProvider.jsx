
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { MovieContext } from "./useCustomcontext";
import {backendUrl} from "../utils/config"
import toast from "react-hot-toast";






// eslint-disable-next-line react/prop-types
export function MovieProvider({setisloading,children,setiserror,setmessage}){
const [current,setcurrent]=useState([])
const [isfetching,setisfetching]=useState(false)


const fetchpopularmovies=useCallback(
  async ()=> {
    try{
      setisfetching(true)
  const response=await axios.get(`${backendUrl}/api/popularmovies`,{
    withCredentials:true
  })
     setcurrent(prev=>[...prev,...response.data.arr])
     setisloading(false)
     setisfetching(false)
    }catch{
     setiserror(true)
    setmessage(`Network error`)
    toast.error("Network error")
     setisfetching(false)
    }
},[])


useEffect(()=>{
    fetchpopularmovies()
},[])




return <MovieContext.Provider  value={{isfetching,current,setcurrent,fetchpopularmovies}}>
{children}
</MovieContext.Provider>
}
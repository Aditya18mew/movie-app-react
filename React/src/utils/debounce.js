import { useEffect, useState } from "react"




export function useDebounce(value,delay){
  const [debounce,setdebounce]=useState(value)

  useEffect(()=>{
    const timer=setTimeout(()=>{
          setdebounce(value)
    },delay)

  return ()=>clearTimeout(timer)
  },[value,delay])

  return debounce
}
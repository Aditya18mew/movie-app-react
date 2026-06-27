import axios from "axios"
import {memo, useEffect, useState } from "react"
import { useCustomcontext } from "./useCustomcontext"
import { useCallback } from "react"
import { useDebounce } from "../utils/debounce"
import { Navchild } from "./section"
import {backendUrl} from "../utils/config"




 // eslint-disable-next-line react/prop-types
 function Navbar({setisloading,setmessage,setiserror}){
  const [search,setsearch]=useState({
    name:"",
    value:""
  })
 /*  const navigate=useNavigate() */
  const {setcurrent}=useCustomcontext()
  const debounce=useDebounce(search.value,500)

    function handlechange(event){
       const {name,value}=event.target
       setsearch({name:name,value:value})
    }
    
   const fetchsearch=useCallback(
    async (name)=>{
        console.log("hello")
        try{
        setisloading(true)
        setiserror(false)
    const response=await axios.post(`${backendUrl}/api/searchmovie`,{name:name},{
      withCredentials:true
    })
       if(!response.data.success){
          setiserror(true)
          setmessage("Network error")
          return
       }
        setisloading(false)
        setcurrent(response.data.arr)
        }catch{
            setiserror(true)
            setmessage(`Network error`)
        }
    },[])



useEffect(()=>{
if(debounce){
    fetchsearch(debounce)
}
},[debounce,fetchsearch])
  

return ( <Navchild><div className="div_input"> <input type="search" value={search.value} id="search" onChange={handlechange} name="search" placeholder="Search"/>
        <div className="input-with-icon"></div></div>
        </Navchild>)
}


export const MemorizedNavbar=memo(Navbar)

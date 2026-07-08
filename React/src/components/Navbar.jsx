import axios from "axios"
import {memo, useEffect, useState } from "react"
import { useCustomcontext } from "./useCustomcontext"
import { useCallback } from "react"
import { useDebounce } from "../utils/debounce"
import { Navchild } from "./section"
import {backendUrl} from "../utils/config"
import toast from "react-hot-toast"
import { Search } from "lucide-react"




 // eslint-disable-next-line react/prop-types
 function Navbar({setisloading,setiserror}){
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
        try{
        setisloading(true)
        setiserror(false)
    const response=await axios.post(`${backendUrl}/api/searchmovie`,{name:name},{
      withCredentials:true
    })
       if(!response.data.success){
          setiserror(true)
          toast.error("Network error")
          return
       }
        setisloading(false)
        setcurrent(response.data.arr)
        }catch{
            setiserror(true)
            toast.error("Network error")
        }
    },[])



useEffect(()=>{
if(debounce){
    fetchsearch(debounce)
}
},[debounce,fetchsearch])
  

return ( <Navchild><div className="div_input"><input type="search" value={search.value} id="search" onChange={handlechange} name="search" placeholder="Search"/>
        <div><Search size={20} color="#9ca3af"/></div></div>
        </Navchild>)
}


export const MemorizedNavbar=memo(Navbar)

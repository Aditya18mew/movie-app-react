import { useState } from "react"


export function useFormdata(){
    const [formdata,setformdata]=useState({
      email:"",
      password:""
    })

    function handlechange(event){
        const {name,value}=event.target
        setformdata({...formdata,[name]:value})
     }
     return {formdata,handlechange}
}
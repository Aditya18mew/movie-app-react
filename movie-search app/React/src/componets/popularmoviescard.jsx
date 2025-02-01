import axios from "axios";
import { useEffect, useState } from "react";
import { Moviecard } from "./moviecard";





export function Popularmoviescard(){
const [popularmovies,setpopularmovies]=useState([])

async function fetchpopularmovies() {
    try{
  const response=await axios.post("http://localhost:5000/api/popularmovies",{name:"aditya"})
  setpopularmovies([...popularmovies,...response.data.arr])
    }catch(err){
         console.log(err)
    }
}

useEffect(()=>{
fetchpopularmovies()
},[])




    return <div className="popularmoviescard">
    {popularmovies.length>0 && popularmovies.map((item)=>{
        return <Moviecard key={item.id} {...item}></Moviecard>
    })}
    <button onClick={()=>{fetchpopularmovies()}}>more</button>
    </div>
}
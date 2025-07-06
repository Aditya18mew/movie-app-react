import { memo, useEffect, useState } from "react"
import { Moviecard } from "./MovieCard"
import { useCustomcontext } from "./useCustomcontext"





 function  Middleware(){

const {isfetching,current,fetchpopularmovies}=useCustomcontext()
const [page,setpage]=useState(0)

useEffect(()=>{
    function handlescroll(){
      if(!isfetching && window.innerHeight+window.scrollY>=5*(document.body.offsetHeight-100)){
            setpage(prev=>prev+1)
        } 
    }
    window.addEventListener("scroll",handlescroll)
    return ()=>window.removeEventListener("scroll",handlescroll)
},[])

 useEffect(()=>{
 fetchpopularmovies(current)
},[page])  




 return <div className="currentmoviescard">
    <div className="moviescard">
        {current.length>0 && current.map((item)=>{
            return <Moviecard key={item.id} {...item}></Moviecard>
        })}
        </div>
        </div>    
}


export const MemorizedMiddleware=memo(Middleware)
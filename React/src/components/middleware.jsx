import { memo, useEffect,useRef,useState } from "react"
import { Moviecard } from "./MovieCard"
import { useCustomcontext } from "./useCustomcontext"
import { Spinner } from "./buttons"






 function  Middleware(){

 const {isfetching,current,fetchpopularmovies}=useCustomcontext()
 const [page,setpage]=useState(0)
 const loaderRef=useRef(null)


 useEffect(()=>{
 fetchpopularmovies()
},[page])  

  useEffect(()=>{
      const observer=new IntersectionObserver((entries)=>{
           console.log('intersecting:', entries[0].isIntersecting, 'fetching:', isfetching)
        if(entries[0].isIntersecting && !isfetching){
            setpage(prev=>prev+1)
        }
      },{threshold:0.1})

      if(loaderRef.current) observer.observe(loaderRef.current)
        return ()=> observer.disconnect()
  },[])



 return <div className="currentmoviescard">
    <div className="moviescard">
        {current.length>0 && current.map((item)=>{
            return <div key={item.id}><Moviecard  {...item}></Moviecard></div>
        })}
        </div>
        <div className="nextscroll" ref={loaderRef}>{isfetching && <Spinner></Spinner>} </div>
    </div>    
}


export const MemorizedMiddleware=memo(Middleware)
import { memo } from "react"
import { Moviecard } from "./moviecard"
import { useCustomcontext } from "./usecustomcontext"




 function  Middlemen(){
const {current,fetchpopularmovies}=useCustomcontext()

 return <div className="currentmoviescard">
        {current.length>0 && current.map((item)=>{
            return <Moviecard key={item.id} {...item}></Moviecard>
        })}
        <button onClick={()=>{fetchpopularmovies()}}>more</button>
        </div>    
}


export const MemorizedMiddlemen=memo(Middlemen)
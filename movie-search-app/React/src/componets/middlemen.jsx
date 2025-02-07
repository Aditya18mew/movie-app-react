import { memo } from "react"
import { Moviecard } from "./moviecard"
import { useCustomcontext } from "./usecustomcontext"




 function  Middlemen(){
const {current,fetchpopularmovies}=useCustomcontext()
 return <div className="currentmoviescard">
    <div className="moviescard">
        {current.length>0 && current.map((item)=>{
            return <Moviecard key={item.id} {...item}></Moviecard>
        })}
        </div>
        <div><button className="btn" onClick={()=>{fetchpopularmovies(current)}}>more</button></div>
        </div>    
}


export const MemorizedMiddlemen=memo(Middlemen)
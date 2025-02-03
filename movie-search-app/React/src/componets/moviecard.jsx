/* eslint-disable react/prop-types */
import { useState } from "react";



const imageBaseUrl = "https://image.tmdb.org/t/p/w500";


export function Moviecard({title,poster_path,overview}){
    const [isexpanded,setisexpanded]=useState(false)
 
const img=`${imageBaseUrl}${poster_path}`
const istoolong=overview.length>90


    return <div className="moviecard">
<img src={img} alt={title} width="200"  height="250"/>
          <div className="movieinfo">
            <h4>{title}</h4>
            <p onClick={()=>{setisexpanded(!isexpanded)}}>{isexpanded || !istoolong ? `Plot: ${overview}`: `Plot: ${overview.slice(0,90)} ...`}
                <span  onClick={()=>{setisexpanded(!isexpanded)}}>{!isexpanded ?"show more":"show less"}</span>
            </p>
          </div>
    </div>
}
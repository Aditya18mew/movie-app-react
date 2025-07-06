/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";



const imageBaseUrl = "https://image.tmdb.org/t/p/w500";


export function Moviecard({id,title,poster_path,overview}){
    const [isexpanded,setisexpanded]=useState(false)
 
const img=`${imageBaseUrl}${poster_path}`
const istoolong=overview.length>90

async function addtowishlist(){
    try{
    const response=await axios.post("http://localhost:5000/api/setwishlist",{id:id,title:title,poster_path:poster_path,overview:overview})
    console.log(response.data.success)
    }catch(err){
        console.log(err)
    }
}
async function addtofavorites(){
    try{
    const response=await axios.post("http://localhost:5000/api/setfavorites",{id:id,title:title,poster_path:poster_path,overview:overview})
    console.log(response.data.success)
    }catch(err){
        console.log(err)
    }
}


    return <div className="moviecard">
<img src={img} alt={title} width="200"  height="250"/>
          <div className="movieinfo">
            <h4>{title}</h4>
            <p onClick={()=>{setisexpanded(!isexpanded)}}>{isexpanded || !istoolong ? `Plot: ${overview}`: `Plot: ${overview.slice(0,90)} ...`}
                <span  onClick={()=>{setisexpanded(!isexpanded)}}>{!isexpanded ?"show more":"show less"}</span>
            </p>
          </div>
            <div className="additionaloption">
                <div className="wishlist_btn" onClick={addtowishlist}></div>
                <button className="favorite_btn" onClick={addtofavorites}></button>
            </div>
    </div>
}
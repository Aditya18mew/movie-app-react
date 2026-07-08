/* eslint-disable react/prop-types */
import axios from "axios";
import { useState} from "react";
import {backendUrl,imageBaseUrl} from "../utils/config"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart,Bookmark,BookmarkCheck } from "lucide-react";









export function Moviecard({id,title,poster_path,overview,isInWishlist,isInFavorite,removeItem,page}){
    const navigate=useNavigate()
    const [isexpanded,setisexpanded]=useState(false)
    const [isfavorite,setisfavorite]=useState(isInFavorite)
    const [iswishlist,setiswishlist]=useState(isInWishlist)


 
const img=`${imageBaseUrl}${poster_path}`
const istoolong=overview.length>90

async function addtowishlist(){
    try{
   const res=await axios.post(`${backendUrl}/api/setwishlist`,{id:id,title:title,poster_path:poster_path,overview:overview,isInWishlist:!iswishlist,isInFavorite:isfavorite},{
        withCredentials:true
    })
     if(res.data.message==="removed from wishlist" && page==="wishlist"){
            removeItem && removeItem(id)
     }
    setiswishlist(prev=>!prev)
    }catch(err){
        console.error(err)
        toast.error("something went wrong")
    }
}

async function addtofavorites(){
    try{
   const res= await axios.post(`${backendUrl}/api/setfavorites`,{id:id,title:title,poster_path:poster_path,overview:overview,isInWishlist:iswishlist,isInFavorite:!isfavorite},{
        withCredentials:true
    })
    if(res.data.message==="removed from favorites" && page==="favorites"){
            removeItem && removeItem(id)
     }
    setisfavorite(!isfavorite)
    }catch(err){
        console.error(err)
        toast.error("something went wrong")
    }
}


    return <div  className="moviecard" onClick={()=>navigate(`/movie/${id}`)}>
<img src={img} alt={title} width="200"  height="250"/>
          <div className="movieinfo">
            <h4>{title}</h4>
            <p onClick={(e)=>{
                 e.stopPropagation()
                setisexpanded(!isexpanded)}}>{isexpanded || !istoolong ? `Plot: ${overview}`: `Plot: ${overview.slice(0,90)} ...`}
                <span  onClick={()=>{setisexpanded(!isexpanded)}}>{!isexpanded ?"show more":"show less"}</span>
            </p>
          </div>
            <div className="additionaloption">
                <button className="wishlist_btn" onClick={(e)=>{
                     e.stopPropagation()
                     addtowishlist()
                }}>{iswishlist ? <BookmarkCheck size={25} color="#a78bfa"/> : <Bookmark size={25} color="#9ca3af"/>}</button>
                <button className="favorite_btn" onClick={(e)=>{
                     e.stopPropagation()
                     addtofavorites()
                }}>{isfavorite ? <Heart size={25} fill="#ef4444" color="#ef4444"/> : <Heart size={25} color="#9ca3af"/>}</button>
            </div>
    </div>
}
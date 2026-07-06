/* eslint-disable react/prop-types */
import axios from "axios";
import { useState} from "react";
import {backendUrl,imageBaseUrl} from "../utils/config"
import wishlist from "./../assets/wishlist.svg"
import wishlist2 from "./../assets/wishlist2.svg"
import favorite from "./../assets/favorite.svg"
import favorite2 from "./../assets/favorite2.svg"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";









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
                }}><img src={iswishlist ? wishlist2 : wishlist}  width={20} height={30}></img></button>
                <button className="favorite_btn" onClick={(e)=>{
                     e.stopPropagation()
                     addtofavorites()
                }}><img src={isfavorite ? favorite2 :favorite}  width={20} height={30}></img></button>
            </div>
    </div>
}
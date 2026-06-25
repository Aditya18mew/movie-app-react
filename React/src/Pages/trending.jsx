import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "../components/buttons";
import { Moviecard } from "../components/MovieCard";



export function Trending(){
   const navigate=useNavigate() 
   const [items,setitems]=useState([])
   const [isloading,setisloading]=useState(true)
   const [iserror,setiserror]=useState(false)
   const [message,setmessage]=useState("");


   function navigatetoWishlist(){
     navigate("/wishlist")
   }
   function navigatetoFavorites(){
     navigate("/favorites")
   }
   function navigatetoHome(){
     navigate("/home")
   }
   function navigatetoTrending(){
     navigate("/trending")
   }
   
   async function fetchtrending(){
    try{   
        setisloading(true)
        setiserror(false)
        const response=await axios.get("http://localhost:3000/api/trendingmovies",{
            withCredentials:true
        })
          if(!response.data.success){
             setiserror(true)
             setmessage("Network error")
          }
         setisloading(false)
         setitems(response.data.arr)       
    }catch(err){
       setiserror(true)
       setmessage(`error:${err.message}`)
    }
   }

   useEffect(()=>{
       fetchtrending()
   },[])


  return <div className="maincotainer" id="mainbody">
          <nav className="navbar">
            <h2 onClick={navigatetoHome}>Movie search</h2>
           <div className="div_input"><input type="search"  id="search" onClick={navigatetoHome} name="search" placeholder="Search"/>
            <div className="input-with-icon"></div> </div>
            <button onClick={navigatetoTrending} className="div_btn">Trending</button>
            <button onClick={navigatetoWishlist} className="div_btn">Wishlist</button>
            <button onClick={navigatetoFavorites} className="div_btn">Favorites</button>
            <Logout></Logout>
          </nav>
        {isloading ? 
        <div className='loading'>{iserror ? <div className='showerror'>{message && <h4>{message}</h4>} <div className='refreshicon' onClick={fetchtrending}></div></div>
        :<div className='loadicon'></div>}</div>
        :<div className="currentmoviescard">
            <div className="moviescard">
                {items.length>0 && items.map((item)=>{
                 return <Moviecard key={item.id} {...item}></Moviecard>
                    })}
                </div>
                </div>}
  </div>
}
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Moviecard } from "./MovieCard"
import { Logout } from "./buttons"
import { Skeleton } from "./skeleton"
import toast from "react-hot-toast"




// eslint-disable-next-line react/prop-types
export function Section({URL}){
       const navigate=useNavigate() 
       const [items,setitems]=useState([])
       const [isloading,setisloading]=useState(true)
       const [iserror,setiserror]=useState(false)

     async function fetchData(){
    try{   
        setisloading(true)
        setiserror(false)
        const response=await axios.get(URL,{withCredentials:true})
          if(!response.data.success){
             setiserror(true)
             toast.error("Network error")
          }
          setisloading(false)
         setitems(response.data.arr)
    }catch(err){
       setiserror(true)
        toast.error(`error:${err.message}`)
       setisloading(false)
    }
   }

   useEffect(()=>{
       fetchData()
   },[URL])

    return <div className="maincotainer" id="mainbody">
             <Navchild><div className="div_input"><input type="search"  id="search" onClick={()=>navigate("/home")} name="search" placeholder="Search"/>
               <div className="input-with-icon"></div> </div></Navchild>
            {iserror ? (
               <div className="error"><div className='showerror'>
                    <div className='refreshicon' onClick={fetchData} />
                </div></div>
            ) : isloading ? (
                 <Skeleton></Skeleton>
            ) : (
                <div className="currentmoviescard">
                    <div className="moviescard">
                        {items.map((item) => (
                            <Moviecard key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            )}
     </div> 
}


// eslint-disable-next-line react/prop-types
export function Navchild({children}){
  const navigate=useNavigate()


  return (<nav className="navbar">
               <h2 onClick={()=>navigate("/home")}>Movie search</h2>
                {children}
               <button onClick={()=>navigate("/trending")} className="div_btn">Trending</button>
               <button onClick={()=>navigate("/wishlist")} className="div_btn">Wishlist</button>
               <button onClick={()=> navigate("/favorites")} className="div_btn">Favorites</button>
               <Logout></Logout>
             </nav>)
}


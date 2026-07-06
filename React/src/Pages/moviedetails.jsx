import { useNavigate, useParams } from "react-router-dom"
import { Navchild } from "../components/section"
import { Moviecard } from "../components/MovieCard"
import { useEffect, useState } from "react"
import { backendUrl,imageBaseUrl ,backdropBaseUrl} from "../utils/config"
import axios from "axios"
import { SkeletonMovieCard } from "../components/skeleton"
import toast from "react-hot-toast"



export function MovieDetails(){
   const {id}=useParams()
   const navigate=useNavigate()
   const [movie,setmovie]=useState(null)
   const [items,setitems]=useState([])
   const [isloading,setisloading]=useState(false)
   const [trailerKey,setTrailerKey]=useState(null)


    async function addtowishlist(){
    try{
    await axios.post(`${backendUrl}/api/setwishlist`,{id:movie.id,title:movie.title,poster_path:movie.poster_path,overview:movie.overview,isInWishlist:true,isInFavorite:null},{
        withCredentials:true
    })
    }catch(err){
        console.error(err)
        toast.error("something went wrong")
    }
} 

async function addtofavorites(){
    try{
    await axios.post(`${backendUrl}/api/setfavorites`,{id:movie.id,title:movie.title,poster_path:movie.poster_path,overview:movie.overview,isInWishlist:null,isInFavorite:true},{
        withCredentials:true
    })
    }catch(err){
        console.error(err)
        toast.error("something went wrong")
    }
} 



useEffect(() => {
    async function fetchAll() {
        setisloading(true)
        const [movieRes, recRes,videoRes] = await Promise.all([
            axios.get(`${backendUrl}/api/movie/${id}`, { withCredentials: true }),
            axios.get(`${backendUrl}/api/movie/${id}/recommendations`, { withCredentials: true }),
            axios.get(`${backendUrl}/api/movie/${id}/videos`,{withCredentials:true})
        ])
        setmovie(movieRes.data.details)
        setitems(recRes.data.arr)
        setTrailerKey(videoRes.data.key)
        setisloading(false)
    }
    fetchAll()
}, [id])


    return <div className="maincotainer" style={{"paddingTop":"80px"}}id="mainbody">
          <Navchild><div className="div_input"><input type="search"  id="search" onClick={()=>navigate("/home")} name="search" placeholder="Search"/>
               <div className="input-with-icon"></div> </div></Navchild>
               {isloading ? <SkeletonMovieCard></SkeletonMovieCard> : ( <>
               <div className="moviedetailcard">
                     {movie && ( <>

                <div className="backdrop" style={{
                    backgroundImage: `url(${backdropBaseUrl}${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />

                <div className="detail-body">
                    <img style={{borderRadius:"5px"}} src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} width="200"  height="250"/>
                    <div className="info">
                        <h1 className="title">{movie.title}</h1>
                        <p className="tagline">{movie.tagline}</p>

                        <div className="meta">
                            <span>{movie.release_date?.slice(0, 4)}</span>
                            <span className="dot">·</span>
                            <span>{movie.runtime} min</span>
                            <span className="dot">·</span>
                            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                        </div>

                        <div className="genres">
                            {movie.genres?.map(g => (
                                <span key={g.id} className="genre">{g.name }</span>
                            ))}
                        </div>

                        <div className="actions">
                            <button onClick={addtofavorites} className="btn btn-primary">Favorite</button>
                            <button onClick={addtowishlist} className="btn btn-ghost">Wishlist</button>
                        </div>
                    </div>
                </div>

                <p className="overview">{movie.overview}</p>
            </>
        )}
             </div></>)}

            {trailerKey && (
            <div className="trailer" style={{ 
                width: '89.5vw', 
                alignSelf: 'center',
                marginTop: '20px',
                borderRadius: '12px',
                overflow: 'hidden'
             }}>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>Trailer</h3>
            <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    width="100%"
                    height="450px"
                    allowFullScreen
                    style={{ border: 'none', borderRadius: '12px' }}
            />
            </div>
            )}



                <div className="currentmoviescard">
                    <div className="moviescard">
                      {items.map((item) => (
                             <Moviecard key={item.id} {...item} />
                         ))}
                    </div>
                </div>
    </div>
}


import { useNavigate, useParams } from "react-router-dom"
import { Navchild } from "../components/section"
import { Moviecard } from "../components/MovieCard"
import { useEffect, useState } from "react"
import { backendUrl,imageBaseUrl ,backdropBaseUrl} from "../utils/config"
import axios from "axios"



export function MovieDetails(){
   const {id}=useParams()
   const navigate=useNavigate()
   const [movie,setmovie]=useState(null)
   const [items,setitems]=useState([])

useEffect(() => {
    async function fetchAll() {
        const [movieRes, recRes] = await Promise.all([
            axios.get(`${backendUrl}/api/movie/${id}`, { withCredentials: true }),
            axios.get(`${backendUrl}/api/movie/${id}/recommendations`, { withCredentials: true })
        ])
        setmovie(movieRes.data.details)
        setitems(recRes.data.arr)
    }
    fetchAll()
}, [id])


    return <div className="maincotainer" style={{"paddingTop":"80px"}}id="mainbody">
          <Navchild><div className="div_input"><input type="search"  id="search" onClick={()=>navigate("/home")} name="search" placeholder="Search"/>
               <div className="input-with-icon"></div> </div></Navchild>
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
                            <button className="btn btn-primary">Favorite</button>
                            <button className="btn btn-ghost">Wishlist</button>
                        </div>
                    </div>
                </div>

                <p className="overview">{movie.overview}</p>
            </>
        )}
               </div>
                <div className="currentmoviescard">
                    <div className="moviescard">
                      {items.map((item) => (
                             <Moviecard key={item.id} {...item} />
                         ))}
                    </div>
                </div>
    </div>
}


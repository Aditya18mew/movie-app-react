import { memo, useEffect, useRef, useState } from "react"
import { Moviecard } from "./MovieCard"
import { useCustomcontext } from "./useCustomcontext"






 function  Middleware(){

const {isfetching,current,fetchpopularmovies}=useCustomcontext()
const [page,setpage]=useState(0)
/* const bottomref=useRef(null)
const divRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

function debounce(func,delay){
    let timeoutId
    return function (...args) {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            func(...args);
          }, delay);
        };
} */

/* const handlescroll=()=>{
    if(document.body.scrollHeight-300< window.scrollY+window.innerHeight){
       setpage((prevPage) => prevPage + 1);
       console.log(page)
    }
}

useEffect(() => {
  const debouncedScroll = debounce(handlescroll, 500);
  window.addEventListener("scroll", debouncedScroll);

  return () => window.removeEventListener("scroll", debouncedScroll);
}, []);
 */


/* 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );
   
    const node=divRef.current
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

useEffect(()=>{
    fetchpopularmovies(current)
},[isInView]) */


 useEffect(()=>{
 fetchpopularmovies(current)
},[page])  



 return <div className="currentmoviescard">
    <div className="moviescard">
        {current.length>0 && current.map((item)=>{
            return <div key={item.id}><Moviecard  {...item}></Moviecard></div>
        })}
        </div>
        </div>    
}


export const MemorizedMiddleware=memo(Middleware)
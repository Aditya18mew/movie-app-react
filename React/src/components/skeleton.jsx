


export function Skeleton(){
  
  return (
       <div className="currentmoviescard">
        <div className="moviescard">
          {Array(8).fill(0).map((_,i)=>(
            <SkeletonCard key={i}></SkeletonCard>
          ))}
        </div>
       </div>
  )
}

export function SkeletonCard(){

  return ( <div className="skeletoncard">
         <div className="skeletonposter"></div>
         <div className="skeletontitle"></div>
         <div className="skeleton-overview"></div>
  </div>
  )
}


export function SkeletonMovieCard(){
  return ( <div className="skeletonmoviecard">
          <div className="skeletonbackdrop"></div>
          <div className="detail-body">
                             <div className="skeletonmovieposter"></div>
                              <div className="info">
                                  <div className="skeletonmovietitle"></div>
                                  <div className="skeletontagline"></div>
                                  <div className="skeletontagline"></div>
                                  <div className="skeletontagline"></div>
                             </div>
                       </div>
                   <div style={{margin:"15px"}} className="skeleton-overview"></div>
  </div>
  )
}
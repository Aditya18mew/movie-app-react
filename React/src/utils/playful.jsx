import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { imageBaseUrl,backendUrl } from './config'






export function Play() {
    const sceneRef = useRef(null)
    const cursorRef = useRef(null)

    useEffect(() => {
        const scene = sceneRef.current
        const cursor = cursorRef.current
        if (!scene || !cursor) return

        scene.querySelectorAll('.trail, .star').forEach(el => el.remove())

        const trails = []
        const TRAIL_COUNT = 18
        const colors = ['#a78bfa', '#c4b5fd', '#7c3aed', '#818cf8', '#e879f9']

        for (let i = 0; i < TRAIL_COUNT; i++) {
            const t = document.createElement('div')
            t.className = 'trail'
            const size = 6 + (TRAIL_COUNT - i) * 0.6
            t.style.cssText = `width:${size}px;height:${size}px;background:${colors[i % colors.length]};opacity:0;position:absolute;border-radius:50%;pointer-events:none;transform:translate(-50%,-50%);`
            scene.appendChild(t)
            trails.push({ el: t, x: 0, y: 0 })
        }

        for (let i = 0; i < 60; i++) {
            const s = document.createElement('div')
            s.className = 'star'
            const sz = Math.random() * 2.5 + 1
            s.style.cssText = `width:${sz}px;height:${sz}px;background:#fff;left:${Math.random() * 100}%;top:${Math.random() * 100}%;opacity:${Math.random() * 0.5 + 0.1};position:absolute;border-radius:50%;`
            scene.appendChild(s)
        }

        let mouseX = 0, mouseY = 0
        let positions = Array(TRAIL_COUNT).fill(null).map(() => ({ x: 0, y: 0 }))
        let animId

        const onMouseMove = (e) => {
            const rect = scene.getBoundingClientRect()
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top
            cursor.style.left = mouseX + 'px'
            cursor.style.top = mouseY + 'px'
            cursor.style.opacity = '1'
        }

        const onMouseLeave = () => {
            cursor.style.opacity = '0'
            trails.forEach(t => t.el.style.opacity = '0')
        }

        const onClick = (e) => {
            const rect = scene.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            for (let i = 0; i < 4; i++) {
                const r = document.createElement('div')
                r.className = 'ripple'
                const sz = 20 + i * 18
                r.style.cssText = `width:${sz}px;height:${sz}px;left:${x}px;top:${y}px;position:absolute;border-radius:50%;border:2px solid ${colors[i % colors.length]};transform:translate(-50%,-50%) scale(0);animation:pop 0.6s ease-out ${i * 0.08}s forwards;pointer-events:none;`
                scene.appendChild(r)
                setTimeout(() => r.remove(), 800)
            }
        }

        scene.addEventListener('mousemove', onMouseMove)
        scene.addEventListener('mouseleave', onMouseLeave)
        scene.addEventListener('click', onClick)

        function lerp(a, b, t) { return a + (b - a) * t }

        function animate() {
            positions[0].x = lerp(positions[0].x, mouseX, 0.35)
            positions[0].y = lerp(positions[0].y, mouseY, 0.35)
            for (let i = 1; i < TRAIL_COUNT; i++) {
                positions[i].x = lerp(positions[i].x, positions[i - 1].x, 0.55)
                positions[i].y = lerp(positions[i].y, positions[i - 1].y, 0.55)
            }
            trails.forEach((t, i) => {
                t.el.style.left = positions[i].x + 'px'
                t.el.style.top = positions[i].y + 'px'
                t.el.style.opacity = (1 - i / TRAIL_COUNT) * 0.7
            })
            animId = requestAnimationFrame(animate)
        }
        animate()

        // Cleanup — critical to avoid memory leaks
        return () => {
            scene.removeEventListener('mousemove', onMouseMove)
            scene.removeEventListener('mouseleave', onMouseLeave)
            scene.removeEventListener('click', onClick)
            cancelAnimationFrame(animId)
        }
    }, [])

    return (
        <div id="scene" ref={sceneRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', cursor: 'none' }}>
            <div id="cursor" ref={cursorRef} style={{ position: 'absolute', width: '16px', height: '16px', background: '#a78bfa', borderRadius: '50%', pointerEvents: 'none', transform: 'translate(-50%,-50%)', opacity: 0, zIndex: 10 }} />
            <div style={{ position: 'relative',zIndex: 5, textAlign: 'center', paddingTop: '4rem' }}>
                <h2 className="sceneh2">Discover movies you`ll love</h2>
                <div className='scenediv'><Sidehustle></Sidehustle></div>
            </div>
        </div>
    )
}



export function Sidehustle(){
  
   const [posters,setposters]=useState([])
   const [current,setCurrent]=useState(0)

   useEffect(()=>{
        async function fetchposter(){
             try{
                  const response=await axios.get(`${backendUrl}/api/public/posters`,{withCredentials:true})
                  setposters(response.data.arr)
             }catch(err){
                console.error(err)
             }
        }
        fetchposter()
   },[])

   useEffect(()=>{
    if(posters.length==0) return;
    const interval=setInterval(()=>{
          setCurrent(prev => (prev + 3) % posters.length)
    },1*20*1000)
    return ()=>clearInterval(interval)
   },[posters])

   const stack=posters.slice(current,current+3)


    return (  
      <div className='sidehustle'>
            {stack.map((movie)=>{
               return <div className='side' key={movie.id}>
                     <img
                        src={`${imageBaseUrl}${movie.poster_path}`}
                        alt={movie.title}
                        width="200"
                        height="250"
                    />
                </div>
            })}
      </div>     
    )
}
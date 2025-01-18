

export function Dashboard(value){
let {str}=value
    return (
        <div className='homepage'>
    <div className='icon'></div>
<h1>Success!</h1>
<p>You have successfully signed {str}.</p>
<button onClick={()=>{
   window.location.href="/home"
}}>Go to dashboard</button>
  </div>
    )
       
    
}
import { useState } from "react"
import { Dashboard } from "./dashboard"



export const Resetpassword=()=>{
      const [success,setsuccess]=useState(false)
      const [password,setpassword]=useState("")
      const [confirmpassword,setconfirmpassword]=useState("")





      return <>{success? <Dashboard str={"reset your password"}></Dashboard>:
      <div className="resetpassworddiv">
      <h1>Reset password</h1>
       <form action="reset" className="resetform">
      <input type="password" placeholder="New password" />
      <input type="password" placeholder="Confirm New password" />
      <span>Minimum 8 characters with atleast one letter and one digit</span>
      <button>Submit</button>
       </form>
      </div>
        }
      </>
}



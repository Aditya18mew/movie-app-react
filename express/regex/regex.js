const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordregex=/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$!%*?&]{8,}$/

function validatemail(email){
return emailregex.test(email)
}

function validatepassword(password){
    return passwordregex.test(password)
}


module.exports={validatemail,validatepassword}
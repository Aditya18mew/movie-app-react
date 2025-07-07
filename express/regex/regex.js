function validatemail(email){
const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
return emailregex.test(email)
}

function validatepassword(password){
    const passwordregex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$!%*?&]{8,}$/
    return passwordregex.test(password)
}


module.exports={validatemail,validatepassword}
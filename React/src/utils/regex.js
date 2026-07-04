const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const PASSWORD_RULES = {
    minLength:      { regex: /.{8,}/,          message: 'At least 8 characters' },
    hasUppercase:   { regex: /[A-Z]/,           message: 'At least one uppercase letter' },
    hasDigit:       { regex: /\d/,              message: 'At least one number' }
}

const otpRegex = /^\d{6}$/

export function validateotp(otp){
   return otpRegex.test(otp)
}


export function validateEmail(email) {
    if (!email || typeof email !== 'string') return { valid: false, message: '❗Email is required' }
    if (!EMAIL_REGEX.test(email.trim())) return { valid: false, message: 'Invalid email format' }
    return { valid: true,message:"good" }
}

export function validatePassword(password) {
    if (!password || typeof password !== 'string') return { valid: false, message: '❗Password is required' }

    for (const rule of Object.values(PASSWORD_RULES)) {
        if (!rule.regex.test(password)) {
            return { valid: false, message: rule.message }
        }
    }

    return { valid: true,message:"good" }
}

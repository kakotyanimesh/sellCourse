const jwt = require('jsonwebtoken')

const userAuth = (req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        return res.status(403).json({
            message : 'token is empty'
        })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.jwt_secret_user)
        req.userId = decodedToken.userId  // while creating token i used userId as variable name so here while destructuring i should use userId
        next()
    } catch (error) {
        res.status(403).json({
            message : 'you arenot signed in yet',
            error : error.message
        })
    }

    
}


module.exports = {
    userAuth
}
import * as jwt from "jsonwebtoken"

const adminAuth = (req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        return res.status(403).json({
            message : 'no token'
        })
    }

    try {
        const decodedadminToken = jwt.verify(token, process.env.jwt_secret_admin)
        req.userId = decodedadminToken.userId  // always use userId
        next() 
    } catch (error) {
        res.status(403).json({
            message : `invalid token ${error.message}`
        })
    }
}


export { adminAuth}
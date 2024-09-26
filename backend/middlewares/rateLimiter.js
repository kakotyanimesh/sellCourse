const { ratelimiter, default: rateLimit } = require('express-rate-limit')


const generalRate = rateLimit({
    windowMs : 10 * 60 * 1000, // 10 mintue window
    max : 100, // 100 limit per 10 minutes
    standardHeaders : true,
    legacyHeaders : false
})


const loginLimit = rateLimit({
    windowMs : 1 * 60 * 1000 , // 1 minute window
    max : 5, // 5 req
    standardHeaders : true,
    legacyHeaders : false
})


const purchaseRate = rateLimit({
    windowMs : 1 * 60 * 1000,
    max : 5,
    standardHeaders : true,
    legacyHeaders : false
})


const adminActionLimit = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 50,
    standardHeaders : true,
    legacyHeaders : false 
})

const browseRate = rateLimit({
    windowMs : 1 * 60 * 1000,
    max : 20,
    standardHeaders : true,
    legacyHeaders : false
})

module.exports = {
    generalRate,
    loginLimit,
    purchaseRate,
    adminActionLimit,
    browseRate
}
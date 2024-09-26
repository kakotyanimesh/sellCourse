const { Router } = require("express")
const courseRouter = Router()
const { userAuth } = require('../middlewares/userauth') 
const { purchaseModel } = require('../model/purchase.model')
const { courseModel } = require("../model/course.model")
const { purchaseRate, browseRate } = require('../middlewares/rateLimiter')


courseRouter.post('/buyCourse',purchaseRate, userAuth, async (req, res) => {
    try {
        const userId = req.userId
        const courseId = req.body.courseId

        // find that user bought the course or not ?? => search in purchaseCourse model with the userId & courseId \

        const isPurchase = await purchaseModel.findOne({userId, courseId})

        if(isPurchase){
            return res.status(403).json({
                message : 'you have bought the course already'
            })
        }
        
        await purchaseModel.create({
            userId, 
            courseId
        })

        res.status(200).json({
            message : 'successfully bought the course'
        })
    } catch (error) {
        res.status(500).json({
            message : `something went wrong ${error.message}`
        })
    }
})


courseRouter.get('/preview',browseRate, async (req, res) => {
    try {
        const courses = await courseModel.find({})

        res.status(200).json({
            courses : courses
        })
    } catch (error) {
        res.status(500).json({
            message : `something went wrong with the server ${error.message}`
        })
    }
})


module.exports = {
    courseRouter
}
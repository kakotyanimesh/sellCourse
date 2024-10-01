const { Router } = require('express')
const adminRouter = Router()
const z = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { default: errorMap } = require('zod/locales/en.js')
const { adminModel } = require('../model/admin.model')
const { adminAuth } = require('../middlewares/adminauth')
const { courseModel } = require('../model/course.model')
const { userAuth } = require('../middlewares/userauth')
const { loginLimit, adminActionLimit } = require('../middlewares/rateLimiter')
const { default: mongoose } = require('mongoose')


adminRouter.post('/signup', loginLimit, async (req, res) => {
    try {
        const object = z.object({
            email: z.string().email({ message : 'provide valid email'}),
            username : z.string().min(3, {message : 'min 3 c needed'}).max(15, {message : 'max 15 allowed'}),
            password : z.string().min(6, {message : 'min 3 allowed'}).max(15, {message : 'max 15 is allowed'}),
            fullName : z.string().min(3, {message : 'min 3 allowed'}).max(15, {message : 'max 15 is allowed'})
        })
     
        const parsedObject = object.safeParse(req.body)
    
        if(!parsedObject.success){
            return res.status(403).json({
                message : 'invalid crediantials ',
                error : parsedObject.error.errors
            })
        }
    
    
        const { email, password, username, fullName } = parsedObject.data
    
        const hasedPassword = await bcrypt.hash(password, 10)
    
        const admin = await adminModel.create({
            email,
            username,
            password : hasedPassword,
            fullName
        })

    
        res.status(201).json({
            message : 'successfully signed up',
        })
    } catch (error) {
        res.status(403).json({
            message : `unable to signed up error : ${error}`
        })
    }
   
})

adminRouter.post('/signin', loginLimit, async (req, res) => {
    try {
        const object = z.object({
            email: z.string().email({ message : 'provide valid email'}),
            password : z.string().min(6, {message : 'min 3 allowed'}).max(15, {message : 'max 15 is allowed'})
        })
    
        const parsedObject = object.safeParse(req.body)
    
        if(!parsedObject.success){
            return res.status(403).json({
                message : 'invalid crediantials',
                error : parsedObject.error.errors
            })
        }
    
        const { email, password } = parsedObject.data
    
        const admin = await adminModel.findOne({email})
    
        if(!admin){
            return res.status(401).json({
                message : 'invalid password or email'
            })
        }
    
        const comparePassword = await bcrypt.compare(password, admin.password)
    
        if(!comparePassword){
            return res.status(401).json({
                message : 'invalid password or email'
            })
        }
    
        const token = jwt.sign({
            userId : admin._id
        }, process.env.jwt_secret_admin, { expiresIn : '24hr'})
    
        res.status(200).json({
            message : 'successfully signed in ',
            token : token
        })
    } catch (error) {
        res.status(403).json({
            message : `something went wrong , errror : ${error.message}`
        })
    }
})


adminRouter.post('/createCourse', adminActionLimit, adminAuth, async (req, res) => {
    try {
        const adminId = req.userId // in jwt-token the user's id(information) is stored in userId ( typo)
        // console.log(adminId);
        
        const object = z.object({
            title : z.string().min(6, {message : 'min 6 character is required'}).max(25, {message : 'max 15 character is allowed'}),
            description : z.string().min(10, {message : 'min 10 '}).max(50,  {message : 'max 10 chracter is allowed'}),
            price : z.number()
        })
    
        const parsedObject = object.safeParse(req.body)
    
        if(!parsedObject.success){
            return res.status(403).json({
                message : 'invalid crediantials', 
                error : parsedObject.error.errors
            })
        }
    
        const { title, description, price } = parsedObject.data
    
        const course = await courseModel.create({
            title,
            description,
            price,
            creatorId: adminId
        })
    
        res.status(200).json({
            message : `course created by ${adminId} `,
            course
        })
    } catch (error) {
        res.status(403).json({
            message : `something went wrong while creating course : ${error.message}`
        })
    }
})


adminRouter.put('/updateCourse', adminActionLimit, adminAuth,async(req, res) => {
    try {
        const adminId = req.userId
        const updateObject = z.object({
            title : z.string().min(5, {message : 'min 6 character is allowed'}).max(15, {message : 'max 15 character is allowed'}),
            description : z.string().min(10, {message : 'min 10'}).max(50, {message : 'max 50 character is allowed'}),
            price : z.number(),
            courseId : z.string()
        })
    
        const parsedObject = updateObject.safeParse(req.body)
    
        if(!parsedObject.success){
            return res.status(403).json({
                message : 'invalid crediantials',
                error : parsedObject.error.errors
            })
        }
    
        const { title, description, price, courseId } = parsedObject.data
    
        await courseModel.updateOne({
            _id : courseId,
            creatorId : adminId
        },{
          title, 
          description, 
          price  
        })
    
        res.status(201).json({
            message : 'course updated'
        })
    } catch (error) {
        res.status(403).json({
            message :  `something went wrong : ${error.message}`
        })   
    }
})


adminRouter.get('/course/bulk', adminActionLimit, adminAuth, async (req, res) => {
    try {
        const adminId = req.userId
    
        const courses = await courseModel.find({
            creatorId : adminId
        })
    
        res.status(200).json({
            message : `courses fetched successfully`,
            courses
        })
    } catch (error) {
        res.status(403).json({
            message : `something went wrong while fetching the courses : ${error.message}`
        })
    }

})

adminRouter.delete('/deleteCourse',async (req, res) => {
    try {
        const {courseId} = req.body

        const result = await courseModel.deleteOne({
            _id: courseId
        })

        // if(result.deletedCount === 0 ){
        //     return res.status(404).json({
        //         message : `course with ${courseId} not found !!`
        //     })
        // }
        res.status(200).json({
            message : ` course with ${courseId} deleted successfully `
        })
    } catch (error) {
        res.status(403).json({
            message : `unable to delete error : ${error.message}`
        })
    }
} )

module.exports = {
    adminRouter
}

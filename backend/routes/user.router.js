const { Router } = require('express')
const userRouter = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const z = require('zod')
const { default: errorMap } = require('zod/locales/en.js')
const { userModel } = require('../model/user.model')
const { userAuth } = require('../middlewares/userauth')
const { adminAuth } = require('../middlewares/adminauth')
const { courseModel } = require('../model/course.model')
const { purchaseModel } = require('../model/purchase.model')
const { generalRate, loginLimit, purchaseRate, browseRate} = require('../middlewares/rateLimiter')


userRouter.post('/signup', loginLimit, async (req, res) => {
    try {
        const signupObject = z.object({
            email: z.string().email({ message : 'provide valid email'}),
            username : z.string().min(3, {message : 'min 3 c needed'}).max(15, {message : 'max 15 allowed'}),
            password : z.string().min(6, {message : 'min 3 allowed'}).max(15, {message : 'max 15 is allowed'}),
            fullName : z.string().min(3, {message : 'min 3 allowed'}).max(15, {message : 'max 15 is allowed'})
        })
    
        const parsedObject = signupObject.safeParse(req.body)
    
        if(!parsedObject.success){
            return res.status(400).json({
                message : 'incorrect data', 
                error : parsedObject.error.errors
            })
        }
    
        const { email, username, password, fullName } = parsedObject.data

        const hasedPassword = await bcrypt.hash(password, 10)
    
        const user = await userModel.create({
            email,
            username,
            password : hasedPassword,
            fullName
        })
    
        res.status(201).json({
            message : 'user created successfully',
        })
    } catch (error) {
        res.status(500).json({
            message : `unable create user error is ${error.message}`
        })
    }
})


userRouter.post('/signin', loginLimit, async (req, res) => {
    try {
        const signinObject = z.object({
            email : z.string().email({message : 'provide a valid email'}),
            password : z.string().min(6, {message : 'valid password required'})
        })

        const parsedObject = signinObject.safeParse(req.body)

        if(!parsedObject.success){
            return res.status(400).json({
                message : 'invalid crediantials',
                error : parsedObject.error.errors
            })
        }

        const { email, password } = parsedObject.data

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(401).json({
                message : 'Invalid email or password'
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if(!comparePassword){
            return res.status(401).json({
                message : 'Invalid email or password'
            })
        }


        const token = jwt.sign({
            userId : user._id  // as im using userId as variable name so in my auth middleware i should use .userId as variable name
        }, process.env.jwt_secret_user, {expiresIn : '24h'})



        res.status(200).json({
            message : 'signedin successfully',
            token
        })
    } catch (error) {
        res.status(500).json({
            message : `something went wrong error is : ${error.message}`
        })
    }
})

userRouter.get('/userCourse', browseRate, userAuth, async (req, res) => {
    try {
        const userId = req.userId
    
        const courses = await purchaseModel.find({userId})
    
        res.status(200).json({
            courses
        })
    } catch (error) {
        res.status(403).json({
            message : `something went wrong : ${error.message}`
        })
    }
})




module.exports = {
    userRouter
}
import { Router, Request, Response } from 'express'
const userRouter = Router()
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { string, z } from 'zod'
const { default: errorMap } = require('zod/locales/en.js')
import { userModel } from '../model/user.model'
import { userAuth } from '../middlewares/userauth'
import { purchaseModel } from '../model/purchase.model'
import { loginLimit } from '../middlewares/rateLimiter'
import { strict } from 'assert'

userRouter.post('/signup', loginLimit, async (req : Request, res : Response) => {
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


userRouter.post('/signin',loginLimit, async (req : Request, res : Response) => {
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

userRouter.get('/userCourse', userAuth, async (req : Request, res: Response) => {
    try {
        const userId = req.userId
    
        const courses = await purchaseModel.find({userId}).populate('courseId', 'title description price')
        // const courseDetails = await courseModel.find({courses.data.})
        res.status(200).json({
            courses
        })
    } catch (error) {
        res.status(403).json({
            message : `something went wrong : ${error.message}`
        })
    }
})




export { userRouter }
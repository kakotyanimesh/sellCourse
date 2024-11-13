import express, {Express} from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import {adminRouter} from './routes/admin.router'
import {userRouter} from './routes/user.router'
import {courseRouter} from './routes/course.router'
import cors from 'cors'
const app : Express = express()

const corsOptions = {
   origin: ['http://localhost:5173', 'https://sell-course-orpin.vercel.app'],
   methods: ['GET', 'POST', 'DELETE', 'PUT'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json()) // dont forget this sir 

const port = process.env.PORT || 3002

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/course', courseRouter )

if(!process.env.MONGO_URL){
   throw new Error("Mongo db uri isnot defined in env file")
} 
const MONGO_DB_URI : string = process.env.MONGO_URL

const main = async () => {
   try {

      // if(!process.env.mongoUrl){
      //    console.log(`mongoDb url is not defined in the env file`);
      //    process.exit(1) // // Exit the application with a non-zero status =-> stop the server 
      // }
   
      await mongoose.connect(MONGO_DB_URI)
      app.listen(port, () => console.log(`the app is running at http://localhost:${port}`))
   } catch (error : any) {
      console.log(`something went wrong unable to conncet to mongoDb , error : ${error.message}`);
   }
} 

main()
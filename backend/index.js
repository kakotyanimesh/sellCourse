const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const { adminRouter } = require('./routes/admin.router')
const { userRouter } = require('./routes/user.router')
const { courseRouter } = require('./routes/course.router')
const app = express()

app.use(express.json()) // dont forget this sir 

const port = process.env.PORT || 3002

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/course', courseRouter )


const main = async () => {
   try {

      if(!process.env.mongoUrl){
         console.log(`mongoDb url is not defined in the env file`);
         process.exit(1) // // Exit the application with a non-zero status =-> stop the server 
      }
   
      await mongoose.connect(process.env.mongoUrl)
      app.listen(port, () => console.log(`the app is running at http://localhost:${port}`))
   } catch (error) {
      console.log(`something went wrong unable to conncet to mongoDb , error : ${error.message}`);
   }
} 

main()
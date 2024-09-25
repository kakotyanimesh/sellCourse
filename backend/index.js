const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const { adminRouter } = require('./routes/admin.router')
const { userRouter } = require('./routes/user.router')
// const { courseRouter } = require('./model/course.model')
const app = express()

app.use(express.json()) // dont forget this sir 

const port = 3002

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
// app.use('/api/v1/course', courseRouter )


const main = async () => {
   try {
    await mongoose.connect(process.env.mongoUrl)
    app.listen(port, () => console.log(`the app is running at http://localhost:${port}`))
   } catch (error) {
    console.log(`something went wrong unable to conncet to mongoDb`);
   }
} 

main()
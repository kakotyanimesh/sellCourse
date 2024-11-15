import mongoose from "mongoose"

const { Schema, Types : {ObjectId } } = mongoose


const courseSchema = new Schema({
    title : {
        type : String,
        unique : true,
        require : true
    },
    description : {
        type : String,
        require : true,
        trim : true,
    },
    price : {
        type : Number,
        require : true,
    },
    creatorId : ObjectId
})


const courseModel = mongoose.model('Course', courseSchema)

export { courseModel}
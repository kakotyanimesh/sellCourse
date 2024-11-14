const mongoose = require("mongoose")
const { string, union } = require("zod")

const { Schema, Types : { ObjectId } } = mongoose


const userSchema = new Schema({
    email : {
        type : String,
        require : true,
        lowercase : true,
        trim : true
    },
    username : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : [true, "password is required"]
    },
    fullName : {
        type : String,
        lowercase : true,
        trim : true,
        required : [true, "full name is required "] 
    }
})


const userModel = mongoose.model('User', userSchema)

export { userModel}
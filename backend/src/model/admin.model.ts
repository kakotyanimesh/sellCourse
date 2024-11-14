
import mongoose, { Schema, Types} from "mongoose"
const { ObjectId } = Types

const adminSchema = new Schema({
    email : {
        type : String,
        unique : true,
        lowercase : true,
        trim : true,
        required : true
    },
    password : {
        type : String,
        required : [true, 'password is requied']
    },
    username : {
        type : String,
        unique : true,
        lowercase : true
    },
    fullName : {
        type : String,
        required : true,
    }
})


const adminModel = mongoose.model('Admin', adminSchema)     

export { adminModel }
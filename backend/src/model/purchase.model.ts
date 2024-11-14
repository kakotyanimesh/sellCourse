const mongoose = require('mongoose')
const { Schema, Types : { ObjectId } } = mongoose



const purchaseSchema = new Schema({
    userId : {
        type:ObjectId,
        ref : 'User'
    },
    courseId : {
        type :ObjectId,
        ref : 'Course'
    }
})


const purchaseModel = mongoose.model('purchase', purchaseSchema)

export { purchaseModel }
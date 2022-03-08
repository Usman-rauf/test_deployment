const mongoose = require('mongoose')

const CatagorySchema = new mongoose.Schema(
    {
        Image: {
            type: String,
            required: true,
        },
        Catagoryname: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true,
        },
    },
    { collection: 'catagories' }
)

const model = mongoose.model('Course-CatagorySchema', CatagorySchema)

module.exports = model

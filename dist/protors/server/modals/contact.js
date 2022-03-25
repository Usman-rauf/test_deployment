const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        country: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },

    },
    { collection: 'contact' }
)

const model = mongoose.model('ContactSchema', ContactSchema)

module.exports = model

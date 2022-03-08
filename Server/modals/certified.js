const mongoose = require('mongoose')

const CertifiedSchema = new mongoose.Schema(
    {
        Image: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
    },
    { collection: 'certificates' }
)

const model = mongoose.model('Certificates', CertifiedSchema)

module.exports = model

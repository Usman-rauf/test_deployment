const mongoose = require('mongoose')

const ratingsSchema = new mongoose.Schema(
    {
        ratings: {
            type: mongoose.Mixed,
            1: Number, //  the key is the weight of that star level
            2: Number,
            3: Number,
            4: Number,
            5: Number,
            default: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 }
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'courses'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
    }, { timestamps: true },

    { collection: 'ratings' }
)

const model = mongoose.model('ratings', ratingsSchema)

module.exports = model

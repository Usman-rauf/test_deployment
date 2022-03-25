const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema(
    {
        blogname: {
            type: String,
            required: true,
        },
        Image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }, { timestamps: true },
    { collection: 'blogs' }
)

const model = mongoose.model('Blogs', BlogSchema)

module.exports = model

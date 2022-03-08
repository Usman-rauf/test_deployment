const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema(
  {
    Image: {
      type: String,
      contentType: String
    },
    coursename: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
  },
  { collection: 'enroll-courses' }
)

const model = mongoose.model('enroll-courses', CourseSchema)

module.exports = model

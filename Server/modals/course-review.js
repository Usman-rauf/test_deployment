const mongoose = require('mongoose')

const CourseReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    courseId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    message: {
      type: String,
      required: true,
    },

  },
  { collection: 'course-review' }
)

const model = mongoose.model('CourseReview', CourseReviewSchema)

module.exports = model

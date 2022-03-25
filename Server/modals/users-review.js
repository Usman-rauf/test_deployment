const mongoose = require('mongoose')

const UserReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    reviewId: {
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
  { collection: 'user-review' }
)

const model = mongoose.model('UserReview', UserReviewSchema)

module.exports = model

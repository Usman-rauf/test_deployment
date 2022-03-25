const mongoose = require('mongoose')

const CatalogReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    catalogId: {
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
  { collection: 'catalog-review' }
)

const model = mongoose.model('CatalogReview', CatalogReviewSchema)

module.exports = model

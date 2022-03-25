const mongoose = require('mongoose')

const CatalogSchema = new mongoose.Schema(
  {
    Image: {
      type: String,
      contentType: String
    },
    catalogname: {
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
    catalogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  }, { timestamps: true },
  { collection: 'buy-catalogs' }
)

const model = mongoose.model('buy-catalogs', CatalogSchema)

module.exports = model

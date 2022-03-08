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
  }, { timestamps: true },
  { collection: 'catalogs' }
)

const model = mongoose.model('Catalog', CatalogSchema)

module.exports = model

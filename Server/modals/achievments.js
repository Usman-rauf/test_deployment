const mongoose = require('mongoose')

const achievementsSchema = new mongoose.Schema(
  {
    file: {
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
  }, { timestamps: true },
  { collection: 'achievments' }
)

const model = mongoose.model('achievments', achievementsSchema)

module.exports = model

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    level: {
      type: String,
      enum: ["Bachelors", "Masters", "None"]
    },
    role: {
      type: String,
      enum: ["Teacher", "Student", "Parent", "Entrepreneur", "Admin"]
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"]
    },
    password: {
      type: String,
    },
    authToken: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
    usertype: {
      type: String,
    },
    bio: {
      type: String,
    },
    education: {
      type: String,
    },
  }, { timestamps: true },
  { collection: 'users' }
)

const model = mongoose.model('Users', UserSchema)

module.exports = model

const express = require('express')
const bodyParser = require('body-parser')
const Course = require("../../modals/cousres")
const Enroll = require('../../modals/enroll-course')
const verifyToken = require("../../middleware/auth")


const router = express()
router.use(bodyParser.json())

router.post('/course', verifyToken, async (req, res) => {
  const { Image, coursename, country, price, description } = req.body.data

  console.log(req.body.data)

  console.log({ "Cousrses": req.body.data })
  const teacherId = req.user.id
  console.log(teacherId)

  if (!(Image, coursename, country, price, description)) {
    return res.json({ status: 'error', error: 'Field is Empty' })
  }

  if (price <= 0) {
    return res.json({ status: "error", error: 'Price cannot be nagative or zero' })
  }

  try {
    const response = await Course.create({
      teacherId, Image, coursename, country, price, description
    })
    res.json({ status: 'ok', message: "Course Added Successful", response })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.post('/enroll-course', verifyToken, async (req, res) => {
  const { _id, teacherId, Image, coursename, country, price, description } = req.body

  const courseId = _id
  const userId = req.user.id


  try {
    if (userId) {
      const response = await Enroll.create({
        courseId, userId, teacherId, Image, coursename, country, price, description
      })
      res.json({ status: 'ok', message: "Course Added Successful", response })
    }
  }
  catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.get('/get-courses', async (req, res) => {
  try {
    const course = await Course.find()
    if (course) { res.json({ status: 'ok', message: "Courses", course }) }
    else { res.json({ status: 'error', message: "Not Found", error: 404 }) }
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.get('/single-course', async (req, res) => {
  const { id } = req.query
  console.log(id)
  try {
    const course = await Course.findById({ _id: id })
    if (course) { res.json({ status: 'ok', message: "Courses", course }) }
    else {
      return res.json({ status: 'error', error: 404, message: "Not Found" })
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.get('/teacher-courses', verifyToken, async (req, res) => {
  try {
    const teacherId = req.user.id
    if (!teacherId) {
      return res.json({ status: '404', error: 'Courses not Found' })
    } else {
      const course = await Course.find({ teacherId })
      if (course) { res.json({ status: 'ok', message: "Courses", course }) }
      else { res.json({ status: 'error', message: "Not Found", error: 404 }) }
    }

  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.get('/students-courses', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id
    console.log(userId)

    if (!userId) {
      return res.json({ status: '404', error: 'Courses not Found' })
    } else {
      const course = await Enroll.find({ userId })
      if (course) { res.json({ status: 'ok', message: "Courses", course }) }
      else { res.json({ status: 'error', message: "Not Found", error: 404 }) }
    }

  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.put('/course', verifyToken, async (req, res) => {
  const { Image, coursename, country, price, description } = req.body.data
  console.log(req.body.data)

  const userId = req.user.id;
  if (!(Image, coursename, country, price, description)) {
    return res.json({ status: 'error', error: 'Field is Empty' })
  }

  if (price <= 0) {
    return res.json({ status: "error", error: 'Price cannot be nagative or zero' })
  }

  try {
    const response = await Course.updateOne({
      userId, Image, coursename, country, price, description
    })
    res.json({ status: 'ok', message: "Course Updated Successful", response })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.delete('/course', verifyToken, async function (req, res) {
  const { id } = req.query
  console.log({ "Course Delete": id })
  const response = await Course.findByIdAndDelete({ _id: id })
  if (!response) {
    return res.status(401).json({
      message: 'Does not Exits'
    })
  } else {
    return res.status(200).json({
      message: 'Item Deleted Successfully',
      response
    })
  }
})


module.exports = router

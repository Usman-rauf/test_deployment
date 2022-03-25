const express = require('express')
const bodyParser = require('body-parser')
const Course = require("../../modals/cousres")
const Course_catagory = require('../../modals/admin-course-catagory')


const router = express()
router.use(bodyParser.json())

router.post('/course-catagory', async (req, res) => {
  const { Image, Catagoryname, Description } = req.body

  if (!(Image, Catagoryname, Description)) {
    return res.json({ status: 'error', error: 'Field is Empty' })
  }

  try {
    const response = await Course_catagory.create({
      Image, Catagoryname, Description
    })
    res.json({ status: 'ok', message: "Catagory Added Successful", response })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.get('/courses', async (req, res) => {
  try {

    const response = await Course.find()

    res.json({ status: 'ok', message: "Course: ", response })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }

})

router.get('/course', async (req, res) => {
  const { id } = req.body

  try {
    const response = await Course.findOne({ '_id': id })
    if (!response) {
      return res.json({ status: '404', error: 'Course not Found' })
    }

    res.json({ status: 'ok', message: "Course: ", response })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.delete('/admin-course', async function (req, res) {
  const { coursename } = req.body
  console.log(req.body)

  const response = await Course.findOneAndDelete({ coursename })

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

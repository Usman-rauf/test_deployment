const express = require('express')
const bodyParser = require('body-parser')
const achievement = require("../../modals/achievments")
const verifyToken = require('../../middleware/auth')
const multer = require('multer')
const path = require('path')

const router = express()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "." + Date.now() + path.extname(file.originalname))

  }
})

const upload = multer({ storage: fileStorageEngine });

router.post('/achievements', upload.single('file'), async (req, res) => {

  const file = req.file.filename

  const { name, description } = req.body
  // const userId = req.user.id

  console.log(req.body.file)
  console.log(req.body.name)
  console.log(req.body.description)

  if (!(file, name, description)) {
    return res.json({ status: 'error', error: 'Field is Empty' })
  }

  // userId

  try {
    const response = await achievement.create({
      name, description, file
    })
    res.json({ status: 'ok', message: "Achievments Added Successfully", response })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: '400', error: 'Bad Request' })
    }
    throw error
  }
})

router.get('/achievements', verifyToken, async (req, res) => {

  const userId = req.user.id
  try {
    const response = await achievement.find({ userId: userId })
    res.json({ status: 'ok', message: "Achievments:", response })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: 'Bad Request' })
    }
    throw error
  }
})

router.delete('/achievements', verifyToken, async (req, res) => {
  const { id } = req.body
  const userId = req.user.id

  try {
    const response = await achievement.findOneAndDelete({ "_id": id })
    res.json({ status: 'ok', message: "Achievments Deleted Successfully", response })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: 'Bad Request' })
    }
    throw error
  }
})

module.exports = router

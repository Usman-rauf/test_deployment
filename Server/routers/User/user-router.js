const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const User = require("../../modals/users")
const Review = require("../../modals/users-review")
const jwt = require('jsonwebtoken')
const config = require("../../config")
const { body, validationResult } = require('express-validator')
const passValidator = require("../../modals/password-validation")
const verifyToken = require('../../middleware/auth')
var ObjectID = require('mongodb').ObjectID;


const router = express()
router.use(bodyParser.json())


router.post('/register', body('email').isEmail().normalizeEmail(), async (req, res) => {
  const { name, password: plainTextPassword, email, role, gender, confirmpassword } = req.body

  // address, status, level,

  console.log(req.body)

  if (!(email, plainTextPassword, name, role, gender)) {
    return res.json({ status: '403', error: 'Field is Empty' })
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: 'Invalid Email',
    });
  }

  if (!['Male', 'Female', 'Other'].includes(gender)) {
    return res.json({ status: 'error', error: 'Invalid Gender' })
  }

  if (!['Teacher', 'Student', 'Parent', 'Enterprise', 'Freelancer'].includes(role)) {
    return res.json({ status: 'error', error: 'Invalid Role' })
  }

  if (!passValidator.validate(plainTextPassword) && ((!plainTextPassword || typeof plainTextPassword !== 'string' || plainTextPassword !== confirmpassword))) {
    return res.json({ status: 'error', error: 'Invalid password' })
  }

  if (plainTextPassword.length < 8) {
    return res.status(400).json(
      { message: "Password should be atleast 8 digits" }
    )
  }

  const password = await bcrypt.hash(plainTextPassword, 8)

  try {
    const response = await User.create({
      name,
      email,
      role,
      gender,
      password,
    })
    res.json({ status: 'ok', message: "User Registeration Successful", response })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: 'email already in use' })
    }
    throw error
  }
})

router.post('/login', body('email').isEmail().normalizeEmail(), async (req, res) => {
  const { email, password } = req.body;

  if (!(email, password)) {
    return res.json({ status: 'error', error: 'Field is Empty' })
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: 'Invalid Email',
    });
  }

  const user = await User.findOne({ email: email });

  if (user && await bcrypt.compare(password, user.password)) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      config.JWT_SECRET, {
      expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    })
    return res.json({ status: 'ok', message: 'User Login Sucessful', token, user })
  }
  return res.json({ status: 'error', error: 'Invalid email/password' });
})

router.post('/socialLogin', async (req, res) => {

  try {
    const id = req.body.response.id
    const name = req.body.response.name
    const email = req.body.response.email
    const authToken = req.body.response.authToken
    const photoUrl = req.body.response.photoUrl
    const usertype = req.body.type

    console.log(usertype)

    const user = await User.findOne({ email: email });
    console.log(user)
    if (user) {
      res.json({ status: 'ok', message: 'User Logged In Sucessful', user: user })
    } else {
      const response = await User.create({
        id,
        name,
        email,
        authToken,
        photoUrl,
        usertype
      });
      res.json({ status: 'ok', message: 'User Created Sucessful', response })
    }
  } catch (err) {
    res.json({ status: '403', message: 'Bad Behaviour', err })
  }
})

router.post('/forgot-password', async (req, res) => {

  const { email } = req.body.email;

  if (!email) {
    return res.json({ status: 'error', error: 'Field is Empty' })
  }

  const response = await User.findOne({ email: email }).then(user => {
    if (user) {
      return res.json({
        status: 'ok', message: 'Email found', user
      })
    } else {
      return res.json({
        status: '401',
        message: 'The email address ' + req.body.email.email +
          ' is not associated with any account. Double-check your email address and try again.',
      })
    }
  })

})

router.post('/reset-password', async (req, res) => {
  const { id, password: plainTextPassword, confirmpassword } = req.body;

  if (!(plainTextPassword && confirmpassword)) {
    return res.json({ status: 'error', error: 'Field is Empty' })
  }

  if (!passValidator.validate(plainTextPassword) && ((!plainTextPassword || typeof plainTextPassword !== 'string' || plainTextPassword !== confirmpassword))) {
    return res.json({ status: 'error', error: 'Invalid password' })
  }

  if (plainTextPassword.length < 8) {
    return res.json(
      res.sendStatus(400), {
      error: 'Password should be atleast 8 characters'
    })
  }

  password = await bcrypt.hash(plainTextPassword, 8)

  try {
    const response = await User.updateOne({ _id: id }, { $set: { password: password } })
    res.json({ status: 'ok', message: "Password Changed Successfully", response })
  } catch (error) {
    if (error.code === 400) {
      return res.json({ status: 'error', error: 'Bad Request' })
    }
    throw error
  }
})

router.post('/settings', verifyToken, async (req, res) => {
  const { name, email, currentpassword: plainTextPassword, newpassword } = req.body;
  try {
    const userId = req.user.id
    const teacherId = req.user.id

    const user = await User.findOne({ _id: userId } || {
      _id: teacherId
    });


    if (name && email) {
      const response = await User.updateOne({ _id: userId } || {
        _id: teacherId
      }, {
        $set: {
          name: name,
          email: email,
        }
      })
      return res.status(200).json({ response })
    }

    if (name === '' && email) {
      const response = await User.updateOne({ _id: userId } || {
        _id: teacherId
      }, {
        $set: {
          email: email,
        }
      })
      return res.status(200).json({ response })
    }
    if (email === '' && name) {
      const response = await User.updateOne({ _id: userId } || {
        _id: teacherId
      }, {
        $set: {
          name: name,
        }
      })
      return res.status(200).json({ response })
    }

    if (plainTextPassword && newpassword && plainTextPassword !== '') {
      if (user && await bcrypt.compare(plainTextPassword, user.password)) {
        const password = await bcrypt.hash(newpassword, 8)
        if (password) {
          const response = await User.updateOne({ _id: userId } || {
            _id: teacherId
          }, {
            $set: {
              password: password,
            }
          })
          return res.status(200).json({ response })
        }
      }
    }


  } catch (error) {
    if (error.code === 400) {
      return res.json({ status: 'error', error: 'Not Matched' })
    }
    throw error
  }

})

router.post('/users-review', verifyToken, async (req, res) => {
  const { id, name, email, message } = req.body.userData
  const reviewId = id
  const userId = req.user.id
  console.log(reviewId)


  if (!(email, name, message)) {
    return res.json({ status: 'error', error: 'Field is Empty' })
  }

  try {
    const response = await Review.create({
      userId,
      reviewId,
      name,
      email,
      message
    })
    res.json({ status: 'ok', message: "User Review Successful", response })
  } catch (error) {
    if (error.code === 403) {
      return res.json({ status: 'error' })
    }
    throw error
  }
})

router.get('/users-review', async (req, res) => {
  const id = req.query.id
  try {
    const review = await Review.find({ reviewId: new ObjectID(id) })
    if (review) {
      res.json({ status: 'ok', message: "Review", review })
    }
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

module.exports = router

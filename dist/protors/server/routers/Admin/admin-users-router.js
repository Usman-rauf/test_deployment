const express = require('express')
const bodyParser = require('body-parser')

// Get Payment Method Data from Database and use it instead of User
const User = require('../../modals/users')


const router = express()
router.use(bodyParser.json())

router.get('/users', async (req, res) => {

  try {
    const users = await User.find()

    res.json({ status: 'ok', message: "Users", users })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }

})

router.get('/specific-tuser', async (req, res) => {
  let role = "Teacher";
  try {
    const users = await User.find({ role: role })
    res.json({ status: 'ok', message: "Users", users })

  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }

})

router.get('/specific-fuser', async (req, res) => {
  let role = "Freelancer";
  try {
    if (role) {
      const users = await User.find({ role: role })
      res.json({ status: 'ok', message: "Users", users })
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }

})

router.get('/specific-euser', async (req, res) => {
  let role = "Enterprise";
  try {
    if (role) {
      const users = await User.find({ role: role })
      res.json({ status: 'ok', message: "Users", users })
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }

})

router.get('/user', async (req, res) => {
  const { name } = req.body

  try {
    const user = await User.findOne({ name })
    if (!user) {
      return res.json({ status: '404', error: 'User not Found' })
    }

    res.json({ status: 'ok', message: "User", user })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.put('/users', async (req, res) => {
  const { email, status } = req.body

  if (!email && !status) {
    return res.json({ error: '403', message: 'Field is Empty' })
  }

  try {
    const user_status = await User.updateOne({ email: email }, { $set: { status: status } })
    return res.status(200).json(user_status);
  } catch (error) {
    if (error.code === 400) {
      return res.json({ status: 'error', error: 'Bad Request' })
    }
    throw error
  }
})

router.delete('/delete-users', async (req, res) => {
  const { name } = req.body

  try {
    const user = await User.findOneAndDelete({ name })
    if (!name || (name !== user.name)) {
      return res.json({ status: '404', error: 'User not Found' })
    }

    res.json({ status: 'ok', message: "User Deleted", user })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

module.exports = router

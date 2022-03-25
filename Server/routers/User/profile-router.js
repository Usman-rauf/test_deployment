const express = require('express')
const bodyParser = require('body-parser')
const User = require('../../modals/users')
const Course = require('../../modals/cousres')
const Catalog = require('../../modals/catalog')
const Achievement = require('../../modals/achievments')
const verifyToken = require('../../middleware/auth')
const router = express()
router.use(bodyParser.json())
var ObjectID = require('mongodb').ObjectID;

router.get('/profile', verifyToken, async (req, res) => {

  const userId = req.user.id
  const teacherId = req.user.id

  const p_data = [
    { $match: { _id: new ObjectID(teacherId) } || { _id: new ObjectID(userId) } },
    {
      $lookup:
      {
        from: 'courses',
        localField: '_id',
        foreignField: 'teacherId',
        as: 'courseData'
      },
    },
    {
      $lookup:
      {
        from: 'catalogs',
        localField: '_id',
        foreignField: 'teacherId',
        as: 'catalogData'
      },
    },
    {
      $lookup:
      {
        from: 'achievments',
        localField: '_id',
        foreignField: 'teacherId',
        as: 'achievementData'
      },
    },
    {
      $lookup:
      {
        from: 'enroll-courses',
        localField: '_id',
        foreignField: 'userId',
        as: 'EnrollData'
      },
    },
    {
      $lookup:
      {
        from: 'buy-catalogs',
        localField: '_id',
        foreignField: 'userId',
        as: 'BuyData'
      },
    },
  ];

  try {

    const profile = await User.aggregate(p_data);
    res.json({ status: 'ok', message: "Profile: ", profile })

  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }

});

router.get('/home-profile', async (req, res) => {
  const { id } = req.query

  try {
    const profile = await User.find({ _id: id });
    const output = await Course.find({ teacherId: id });
    const output1 = await Catalog.find({ teacherId: id });
    const output2 = await Achievement.find({ teacherId: id });

    res.json({ status: 'ok', message: "Profile: ", profile, output, output1, output2 })

  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }

});

router.put('/user-bio', verifyToken, async (req, res) => {
  const { bio } = req.body
  console.log(bio)
  const userId = req.user.id

  try {
    const user_profile = await User.updateOne({ _id: userId }, { $set: { bio } })
    return res.status(200).json({ user_profile });
  } catch (error) {
    if (error.code === 400) {
      return res.json({ status: 'error', error: 'Bad Request' })
    }
    throw error
  }
})

router.put('/add-education', verifyToken, async (req, res) => {
  const { education } = req.body
  console.log({ "Add Education": education })
  const userId = req.user.id

  try {
    const user_profile = await User.updateOne({ _id: userId }, { $push: { education: education } })
    return res.status(200).json(user_profile);
  } catch (error) {
    if (error.code === 400) {
      return res.json({ status: 'error', error: 'Bad Request' })
    }
    throw error
  }
})

router.put('/user-education', verifyToken, async (req, res) => {
  const { education, index } = req.body
  console.log(education, index);
  const userId = req.user.id

  try {
    const user_profile = await User.updateOne({ _id: userId }, { $set: { [`education.${index}`]: education } })
    return res.status(200).json(user_profile);
  } catch (error) {
    if (error.code === 400) {
      return res.json({ status: 'error', error: 'Bad Request' })
    }
    throw error
  }
})


module.exports = router

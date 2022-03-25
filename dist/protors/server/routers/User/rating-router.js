const express = require('express')
const bodyParser = require('body-parser')
const rate = require("../../modals/ratings")
const Course = require("../../modals/cousres")
const verifyToken = require('../../middleware/auth')

const router = express()
router.use(bodyParser.json())

router.post('/ratings', verifyToken, async (req, res) => {
    const { courseId, ratings } = req.body
    const response = await Course.findOne({ courseId })
    console.log(response)

    if (courseId == null) {
        return res.json({ status: 'error', error: '403' })
    }
    try {
        const userId = req.user.id
        console.log(userId)
        const _rate = await rate.create({ ratings, courseId, userId })
        res.json({ status: 'ok', message: "Ratings: ", _rate })
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: '403' })
        }
        throw error
    }


});

module.exports = router

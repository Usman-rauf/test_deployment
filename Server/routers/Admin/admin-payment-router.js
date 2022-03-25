const express = require('express')
const bodyParser = require('body-parser')
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

router.delete('/user-delete', async (req, res) => {
    const { name } = req.body

    try {
        const user = await User.findOneAndDelete({ name })
        if (!user) {
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
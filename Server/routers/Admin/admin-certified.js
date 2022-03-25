const express = require('express')
const bodyParser = require('body-parser')
const Certified = require("../../modals/certified")
const verifyToken = require("../../middleware/auth")

const router = express()
router.use(bodyParser.json())

router.post('/admin-certified', async (req, res) => {
    const { user, Image, name, description } = req.body

    if (!(Image, user, name, description)) {
        return res.json({ status: 'error', error: 'Field is Empty' })
    }

    try {
        const response = await Certified.create({
            user, Image, name, description
        })
        res.json({ status: 'ok', message: "Certificate Added Successful", response })
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: '403' })
        }
        throw error
    }
})

router.post('/user-certified', verifyToken, async (req, res) => {

    try {
        const { Image, name, description } = req.body

        const userId = req.user.id

        if (!(Image, name, description)) {
            return res.json({ status: 'error', error: 'Field is Empty' })
        }

        if (userId) {
            const response = await Certified.create({
                userId, Image, name, description
            })
            res.json({ status: 'ok', message: "Certification Successful", response })
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: '403' })
        }
        throw error
    }
})

router.get('/certified', async (req, res) => {
    try {
        const response = await Certified.find()

        res.json({ status: 'ok', message: "Certificate: ", response })
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: '403' })
        }
        throw error
    }

})

router.delete('/certified', async function (req, res) {
    const { name } = req.body
    const response = await Certified.findOneAndDelete({ name })

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

const express = require('express')
const bodyParser = require('body-parser')
const Contact = require('../../modals/contact')


const router = express()
router.use(bodyParser.json())


router.get('/admin-contact', async (req, res) => {
    try {
        const response = await Contact.find()
        res.json({
            status: 'ok', message: "Contact Retreived", response
        })
    } catch (error) {
        if (error.code === 403) {
            return res.json({ status: 'error' })
        }
        throw error
    }
})

module.exports = router

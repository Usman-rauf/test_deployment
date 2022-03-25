const express = require('express')
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator')
const Contact = require('../../modals/contact')


const router = express()
router.use(bodyParser.json())


router.post('/contact', body('email').isEmail().normalizeEmail(), async (req, res) => {
    const { name, company, email, country, message } = req.body

    if (!(email, company, country, name)) {
        return res.json({ status: 'error', error: 'Field is Empty' })
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Invalid Email',
        });
    }

    try {
        const response = await Contact.create({
            name,
            email,
            company,
            country,
            message
        })
        res.json({ status: 'ok', message: "Contact Successful", response })
    } catch (error) {
        if (error.code === 403) {
            return res.json({ status: 'error' })
        }
        throw error
    }
})

module.exports = router

const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const User = require('../../modals/users')
const { body, validationResult } = require('express-validator')
const passValidator = require('../../modals/password-validation')
const verifyToken = require("../../middleware/auth")

const router = express()
router.use(bodyParser.json())

router.post('/admin-login', body('email').isEmail().normalizeEmail(), async (req, res) => {

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

    const admin = await User.findOne({ email: email });

    if (admin && await bcrypt.compare(password, admin.password)) {
        return res.json({ status: 'ok', message: 'Admin Login Sucessful', Admin: admin })
    }
    return res.json({ status: 'error', error: 'Invalid email/password' });
})

router.post('/admin-forgot-password', verifyToken, body('email').isEmail().normalizeEmail(), async (req, res) => {

    const { email } = req.body;

    if (!(email)) {
        return res.json({ status: 'error', error: 'Field is Empty' })
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Invalid Email',
        });
    }
    const response = await User.findOne({ email: email }).then(user => {
        if (user) {
            return res.json({ status: 'ok', message: 'Email found', response })
        } else {
            return res.status(401).json({
                message: 'The email address ' + req.body.email +
                    ' is not associated with any account. Double-check your email address and try again.'
            })
        }
    })

})

router.post('/admin-create-password', verifyToken, async (req, res) => {
    const { password: plainTextPassword, confirmpassword } = req.body;

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
        const response = await User.updateOne({
            password
        })
        res.json({ status: 'ok', message: "Password Changed Successfully", response })
    } catch (error) {
        if (error.code === 400) {
            return res.json({ status: 'error', error: 'Bad Request' })
        }
        throw error
    }
})

router.post('/admin-register', body('email').isEmail().normalizeEmail(), async (req, res) => {
    const { name, password: plainTextPassword, email, address, status, level, role, gender, confirmpassword } = req.body
    console.log('ADMIN');
    if (!(email, plainTextPassword, address, name, role, level, gender)) {
        return res.json({ status: 'error', error: 'Field is Empty' })
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
    if (!['Bachelors', 'Masters', 'None'].includes(level)) {
        return res.json({ status: 'error', error: 'Invalid Level;' })
    }
    if (!['Teacher', 'Student', 'Parent', 'Admin', 'Entrepreneur'].includes(role)) {
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
            address,
            level,
            role,
            status,
            gender,
            password,
        })
        res.json({ status: 'ok', message: "Registeration Successful", response })
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: 'email already in use' })
        }
        throw error
    }
})


module.exports = router
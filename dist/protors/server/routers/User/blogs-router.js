const express = require('express')
const bodyParser = require('body-parser')
const Blog = require("../../modals/blogs")


const router = express()
router.use(bodyParser.json())


router.post('/blogs', async (req, res) => {
    const { blogname, Image, description } = req.body

    if (!(blogname, Image, description)) {
        return res.json({ status: 'error', error: 'Field is Empty' })
    }

    try {
        const response = await Blog.create({
            blogname, Image, description
        })
        res.json({ status: 'ok', message: "Blog Uploaded Successfully", response })
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: '403' })
        }
        throw error
    }
})

router.get('/blogs', async (req, res) => {

    console.log("Blogs Touched")
    try {
        const blog = await Blog.find()
        res.json({ status: 'ok', message: "Blog", blog })
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: '403' })
        }
        throw error
    }

})

router.put('/blogs', async (req, res) => {
    const { blogname, Image, description } = req.body

    if (!(blogname, Image, description)) {
        return res.json({ status: 'error', error: 'Field is Empty' })
    }

    try {
        const response = await Blog.findOneAndUpdate({
            blogname, Image, description
        })
        res.json({ status: 'ok', message: "Blog Updated Successfully", response })
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: '403' })
        }
        throw error
    }
})

router.delete('/blogs', async function (req, res) {
    const { blogname } = req.body

    const response = await Blog.findOneAndDelete({ blogname })

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

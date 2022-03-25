const express = require('express')
const bodyParser = require('body-parser')
const Catalog = require("../../modals/catalog")
const Review = require('../../modals/catalog-review')
const Buy = require('../../modals/buy-catalog')
const verifyToken = require('../../middleware/auth')
var ObjectID = require('mongodb').ObjectID;

const router = express()
router.use(bodyParser.json())


router.post('/catalog', verifyToken, async (req, res) => {
  const { Image, catalogname, country, price, description } = req.body.data

  console.log({ 'Catalog': req.body.data })
  const teacherId = req.user.id

  if (!(Image, catalogname, country, price, description)) {
    return res.json({ status: 'error', error: 'Field is Empty' })
  }

  if (price <= 0) {
    return res.json({ status: "error", error: 'Price cannot be nagative or zero' })
  }

  try {
    const response = await Catalog.create({
      teacherId, Image, catalogname, country, price, description
    })
    res.json({ status: 'ok', message: "Catalog Added Successful", response })
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.post('/buy-catalog', verifyToken, async (req, res) => {
  const { _id, teacherId, Image, catalogname, country, price, description } = req.body

  const catalogId = _id
  const userId = req.user.id

  try {
    if (userId) {
      const response = await Buy.create({
        catalogId, userId, teacherId, Image, catalogname, country, price, description
      })
      res.json({ status: 'ok', message: "Catalog Successful", response })
    }
  }
  catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.get('/get-catalogs', async (req, res) => {
  try {
    const catalog = await Catalog.find()
    if (catalog) { res.json({ status: 'ok', message: "Catalogs:", catalog }) }
    else { res.json({ status: 'error', message: "Not Found", error: 404 }) }
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.get('/students-catalogs', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id
    console.log({ "Catalog": userId })

    if (!userId) {
      return res.json({ status: '404', error: 'Catalog not Found' })
    } else {
      const catalog = await Buy.find({ userId })
      if (catalog) { res.json({ status: 'ok', message: "Courses", catalog }) }
      else { res.json({ status: 'error', message: "Not Found", error: 404 }) }
    }

  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.get('/teacher-catalogs', verifyToken, async (req, res) => {
  try {
    const teacherId = req.user.id

    if (!teacherId) {
      return res.json({ status: '404', error: 'Catalogs not Found' })
    } else {
      const catalog = await Catalog.find({ teacherId: teacherId })
      if (catalog) { res.json({ status: 'ok', message: "Catalogs", catalog }) }
      else { res.json({ status: 'error', message: "Not Found", error: 404 }) }
    }

  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.get('/single-catalog', verifyToken, async (req, res) => {
  const { id } = req.query
  console.log(id)
  try {
    const catalog = await Catalog.findById({ _id: id })
    if (catalog) { res.json({ status: 'ok', message: "Catalog", catalog }) }
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

router.put('/catalogs', verifyToken, async (req, res) => {
  const { Image, catalogname, country, price, description } = req.body.data
  const id = req.body.catalog_id
  console.log(id)

  const teacherId = req.user.id;

  if (!(Image, catalogname, country, price, description)) {
    return res.json({ status: 'error', error: 'Field is Empty' })
  }

  if (price <= 0) {
    return res.json({ status: "error", error: 'Price cannot be nagative or zero' })
  }

  try {
    const response = await Catalog.updateOne({ _id: new ObjectID(id) }, {
      teacherId, Image, catalogname, country, price, description
    })
    res.json({ status: 'ok', message: "Course Updated Successful", response })

  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.delete('/catalog', verifyToken, async function (req, res) {
  const { id } = req.query
  console.log({ "Course Delete": id })

  const response = await Catalog.findByIdAndDelete({ _id: id })

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

router.post('/catalog-review', verifyToken, async (req, res) => {
  const { id, name, email, message } = req.body.catalogData
  const catalogId = id
  const userId = req.user.id

  if (!(email, name, message)) {
    return res.json({ status: 'error', error: 'Field is Empty' })
  }

  try {
    const response = await Review.create({
      userId,
      catalogId,
      name,
      email,
      message
    })
    res.json({ status: 'ok', message: "Cousre Review Successful", response })
  } catch (error) {
    if (error.code === 403) {
      return res.json({ status: 'error' })
    }
    throw error
  }
})

router.get('/review-catalog', async (req, res) => {
  const id = req.query.id
  try {
    const review = await Review.find({ catalogId: new ObjectID(id) })
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

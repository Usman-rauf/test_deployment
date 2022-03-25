const express = require('express')
const bodyParser = require('body-parser')
const User = require('../../modals/users')
const Catalog = require('../../modals/catalog')
const Course = require('../../modals/cousres')


const router = express()
router.use(bodyParser.json())

router.get('/search', async (req, res) => {
  try {
    const { type, searchquery, price } = req.query
    console.log(req.query)

    var query = {};
    var result = [];

    if (type === "search") {

      var query1 = {}
      if (searchquery && searchquery !== '' && searchquery !== "undefined") { query1.name = searchquery; }
      if (price && price !== '' && price !== "undefined") { query1.price = price; }
      console.log("Everything", query1)
      result.push(new Promise(async (resolve, reject) => {
        const output1 = await User.find(query1);
        const search = {
          Users: output1
        }
        console.log(search)
        resolve(search);
      }));


      var query2 = {}
      if (searchquery && searchquery !== '' && searchquery !== "undefined") { query2.coursename = searchquery; }
      if (price && price !== '' && price !== "undefined") { query2.price = price; }
      console.log("Everything", query2)
      result.push(new Promise(async (resolve, reject) => {
        const output2 = await Course.find(query2);
        const search = {
          Courses: output2
        }
        console.log(search)
        resolve(search);
      }));

      var query3 = {}
      console.log(query3.catalogname)
      if (searchquery && searchquery !== '' && searchquery !== "undefined") { query3.catalogname = searchquery; }
      if (price && price !== '' && price !== "undefined") { query3.price = price; }
      console.log("Everything", query3)
      result.push(new Promise(async (resolve, reject) => {
        const output3 = await Catalog.find(query3);
        const search = {
          Catalog: output3
        }
        console.log(search)
        resolve(search);
      }));
    }

    if (type === "teachers") {
      if (searchquery && searchquery !== '' && searchquery !== "undefined") { query.name = searchquery; }
      if (price && price !== '' && price !== "undefined") { query.price = price; }
      result.push(new Promise(async (resolve, reject) => {
        const output = await User.find(query);
        console.log(query)
        resolve(output);
      }));
    }

    if (type === "freelancers") {
      if (searchquery && searchquery !== '' && searchquery !== "undefined") { query.name = searchquery; }
      if (price && price !== '' && price !== "undefined") { query.price = price; }
      result.push(new Promise(async (resolve, reject) => {
        const output = await User.find(query);
        resolve(output);
      }));
    }

    if (type === "enterprises") {
      if (searchquery && searchquery !== '' && searchquery !== "undefined") { query.name = searchquery; }
      if (price && price !== '' && price !== "undefined") { query.price = price; }
      result.push(new Promise(async (resolve, reject) => {
        const output = await User.find(query);
        resolve(output);
      }));
    }

    if (type === "courses") {
      if (searchquery && searchquery !== '' && searchquery !== "undefined") { query.coursename = searchquery; }
      if (price && price !== '' && price !== "undefined") { query.price = price; }
      console.log("Course", query)
      result.push(new Promise(async (resolve, reject) => {
        const output = await Course.find(query);
        resolve(output);
      }));
    }

    if (type === "catalogs") {
      if (searchquery && searchquery !== '' && searchquery !== "undefined") { query.catalogname = searchquery; }
      if (price && price !== '' && price !== "undefined") { query.price = price; }
      console.log("Catalog", query)
      result.push(new Promise(async (resolve, reject) => {
        const output = await Catalog.find(query);
        resolve(output);
      }));
    }

    return res.status(200).json(await Promise.all(result));

  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'error', error: '403' })
    }
    throw error
  }
})

router.get("/searched", async (req, res) => {
  const { q } = req.query
  console.log(req.query)

  try {
    let result = []
    result.push(new Promise(async (resolve, reject) => {
      const output1 = await User.find({ "name": q });
      const search = {
        Users: output1
      }
      console.log(search)
      resolve(search);
    }));
    result.push(new Promise(async (resolve, reject) => {
      const output2 = await Course.find({ "coursename": q });
      const search = {
        Course: output2
      }
      console.log(search)
      resolve(search);
    }));
    result.push(new Promise(async (resolve, reject) => {
      const output3 = await Catalog.find({ "catalogname": q });
      const search = {
        Catalog: output3
      }
      console.log(search)
      resolve(search);
    }));

    return res.status(200).json(await Promise.all(result));
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

module.exports = router



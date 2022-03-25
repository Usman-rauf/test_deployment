const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const admin = require('./routers/Admin/admin-router')
const admin_users = require('./routers/Admin/admin-users-router')
const admin_courses = require('./routers/Admin/admin-courses-router')
const admin_payment = require('./routers/Admin/admin-payment-router')
const admin_certification = require('./routers/Admin/admin-certified')
const admin_contact = require('./routers/Admin/admin-contact')

const search = require('./routers/User/search-router')

const user = require('./routers/User/user-router')
const contact = require('./routers/User/contact-router')
const course = require('./routers/User/course-router')
const catalog = require('./routers/User/catalog-router')
const blog = require("./routers/User/blogs-router")
const achievments = require('./routers/User/achievement-router')
const ratings = require('./routers/User/rating-router')
const profile = require('./routers/User/profile-router')
const verifyToken = require('./middleware/auth')


const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/Protors', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

var corsOptions = {
  // origin: 'http://localhost:4200',
  origin: '*',
  optionsSuccessStatus: 200
}

const app = express()
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(admin)
app.use(admin_users)
app.use(admin_courses)
app.use(admin_payment)
app.use(admin_certification)
app.use(admin_contact)

app.use(search)

app.use(user)
app.use(blog)
app.use(course)
app.use(catalog)
app.use(contact)
app.use(achievments)
app.use(ratings)
app.use(profile)


let users = [];
const userHistory = [];
io.on("connection", (socket) => {

  const user = `${socket.id.substr(0, 1)}`
  const existingUser = users.find((res) => {
    res === user
  });

  if (existingUser) {
    return { error: "User Already Exit" };
  }

  users.push(user);

  console.log(`User Connected:`, { user })

  if (users.find(id => id === user)) {
    io.emit('message', `${userHistory}`);
  }

  io.emit('message', `${user} has just join`);

  socket.on('message', (message) => {
    io.emit('message',
      `${socket.id.substr(0, 1)}, said ${message}`);
    userHistory.push(message);
    console.log(userHistory)
  })

  socket.on('disconnect', () => {
    const user = `${socket.id.substr(0, 1)}`;
    if (user) {
      io.emit('message', `${user} had left`);
    }
  })
})

const port = process.env.PORT || 4000
server.listen(port,
  () => console.log(`Localhost Running: ${port}`));

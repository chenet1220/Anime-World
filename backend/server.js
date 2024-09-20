const path = require('path') // Built into Node
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const animeRoutes = require('./routes/anime')
const authRoutes = require('./routes/auth')
const commentRoutes = require('./routes/comments')
const likeRoutes = require('./routes/userLikes')
const cors = require('cors')

// Initialize environment variables
dotenv.config()

const app = express()

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '../frontend/dist')))

// Middleware
app.use(cors())
app.use(express.json())

app.use(require('./middleware/checkToken'))

// Routes
app.use('/api/auth', authRoutes)

const ensureLoggedIn = require('./middleware/ensureLoggedIn')

app.use('/api/anime', ensureLoggedIn, animeRoutes)
app.use('/api/comments', ensureLoggedIn, commentRoutes)
app.use('/api/userLikes', ensureLoggedIn, likeRoutes)

app.get('*', function (req, res) {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`)
})
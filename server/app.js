require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

const userRouter = require('./routes/user')
const universeRouter = require('./routes/universe')
const authMiddle = require('./middleware/auth')

const API = require('./controllers/api')

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// database connection
mongoose.connect(process.env.PROD_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('Connected to the database!'))
  .catch(e => console.log(e))

// routes prefix
app.use('/api/user', authMiddle(), userRouter)
app.use('/api/universe', authMiddle(), universeRouter)
app.post('/api/login', API.login)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/dist/'))
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
  })
}

// start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))

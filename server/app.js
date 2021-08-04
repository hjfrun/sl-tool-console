require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('Connected to the database!'))
  .catch(e => console.log(e))

// routes prefix
app.use('/api', require('./routes/routes'))

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))

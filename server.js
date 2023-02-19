const express = require('express')
require('dotenv').config()
require('./config/database')
const cors = require('cors')
const router = require('./routes/index')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

// const port = process.env.PORT
// const host = process.env.HOST || '0.0.0.0'

app.listen(process.env.PORT || 5000)

const express = require('express')
const app = express()
const port = 5000

const cors = require('cors')
require('dotenv').config()

// app.use(express.urlencoded({ extended: true }))
// app.use(cors())
// app.use(express.json())


// const {router} = require('./routes')

// app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
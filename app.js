require("dotenv").config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const cors = require('cors')
const path=require('path')
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(router)
app.use(errorHandler)


app.use(express.static(path.join(__dirname, '/client')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = 3000
var path = require('path')
// var expressValidator = require('express-validator')

const router = require('./routes/index')
app.use('/', express.static(path.join(__dirname, 'public')))

// View Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Express Validator Middleware (after bodyParser)
// app.use(expressValidator())

// Routes
app.use('/', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

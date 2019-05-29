const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const path = require('path')
const expressSession = require('express-session')
var fileUpload = require('express-fileupload')
const router = require('./routes/index')

var http = require('http')

// var io = require('socket.io')(http)

// View Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Routes
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/public/tmp/', express.static(path.join(__dirname + '/public/tmp')))

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// trust first proxy
app.set('trust proxy', 1)

// Middleware
app.use(
	fileUpload({
		useTempFiles: true,
		safeFileNames: true,
		preserveExtension: true,
		tempFileDir: 'public/tmp' // `${__dirname}/public/files/temp`
	})
)
// by default uses memory storage, may not be good
app.use(
	expressSession({
		secret: 'max',
		saveUninitialized: false,
		resave: false
	})
)

// Routes
app.use('/', router)

app.set('port', port)
// Create HTTP server.
var server = http.createServer(app)
server.listen(port)
server.on('listening', () => {
	var addr = server.address()
	var bind = typeof addr === 'string' ? addr : addr.port
	console.log(`App running at http://localhost:${bind}`)
})

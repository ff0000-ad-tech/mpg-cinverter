const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 4000
const path = require('path')
const expressSession = require('express-session')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const http = require('http')
const tempFiles = require('./controllers/tempFiles')

// View Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Routes
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/public/tmp/', express.static(path.join(__dirname + '/public/tmp')))
app.use(express.static('node_modules'))

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
		tempFileDir: tempFiles.tempFilesDir
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

// clear out the temp files directory
tempFiles.clear()

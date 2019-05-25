const express = require('express')
const router = express.Router()
const encodeMPG = require('../controllers/encoder')
const path = require('path')
const { Readable } = require('stream')

router.get('/', (req, res) => {
	console.log('get("/")', req.body, req.session)
	res.render('index', {
		previews: req.session.uploads || [],
		src: null, // req.session.upload ? req.session.upload.url : null,
		mimeType: req.session.mimeType || null
	})
})

router.post('/upload', (req, res) => {
	console.log('post /upload', req.body, req.session)
	// const obj = Object.assign({}, req.files.videoSource)
	// obj.url = path.resolve(__dirname, obj.name)
	// req.session.upload = obj
	console.log('********')
	console.log(req.files.buffer)
	console.log('--------')
	const r = new Readable()
	console.log(r)
	// r.Readables.push(req.files.buffer)
	// r.Readables.push(null)
	// console.log(r)
	console.log('>>>>>>>>>>>')
	res.redirect('/')
})

router.post('/process', (req, res) => {
	req.session.uploads = req.session.uploads || []
	let obj = Object.assign({}, req.files, req.body)

	encodeMPG().then(str => {
		obj.thing = str
		req.session.uploads.push(obj)
		res.redirect('/')
	})
})

module.exports = router

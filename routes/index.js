const express = require('express')
const router = express.Router()
const encodeMPG = require('../controllers/encoder')

router.get('/', (req, res) => {
	console.log('get("/")', req.body, req.session)
	res.render('index', {
		videoSource: req.session.videoSource || null,
		encodes: req.session.encodes || null
	})
})

router.post('/upload', (req, res) => {
	console.log('post /upload', req.body, req.session)
	req.session.videoSource = req.files.videoSource
	req.session.encodes = []
	res.redirect('/')
})

router.post('/process', (req, res) => {
	encodeMPG(req.session.videoSource, req.body.videoQuality).then(obj => {
		req.session.encodes.push(obj)
		res.redirect('/')
	})
})

module.exports = router

const express = require('express')
const router = express.Router()
const encodeMPG = require('../controllers/encoder')

router.post('/upload', (req, res) => {
	// console.log('post /upload', req.body, req.session)
	req.session.videoSource = req.files.videoSource
	req.session.encodes = []
	res.json({ tempFilePath: req.files.videoSource.tempFilePath })
})

router.post('/process', (req, res) => {
	// console.log('process/', req.session, req.body)
	encodeMPG(req.session.videoSource, req.body.videoQuality).then(obj => {
		req.session.encodes.push(obj)
		res.json(req.session)
	})
})

module.exports = router

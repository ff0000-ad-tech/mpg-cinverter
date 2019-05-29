const express = require('express')
const router = express.Router()
const encodeMPG = require('../controllers/encoder')
const path = require('path')
// const { Readable } = require('stream')
const fs = require('fs')

router.get('/', (req, res) => {
	console.log('get("/")', req.body, req.session)
	res.render('index', {
		previews: req.session.previews || [],
		encodes: req.session.encodes || null,
		mimeType: req.session.mimeType || null
	})
})

router.post('/upload', (req, res) => {
	console.log('post /upload', req.body, req.session)
	req.session.videoSource = req.files.videoSource
	req.session.encodes = []
	console.log('********')
	res.redirect('/')
})

router.post('/process', (req, res) => {
	encodeMPG(req.session.videoSource, req.body.videoQuality).then(obj => {
		req.session.encodes.push(obj)
		res.redirect('/')
	})
})

module.exports = router

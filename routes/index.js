const express = require('express')
const router = express.Router()
const encodeMPG = require('../controllers/encoder')
const fs = require('fs')

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

router.get('/download', (req, res) => {
	// console.log('/download query:', req.query)

	return (
		new Promise((resolve, reject) => {
			// Check if the right request is coming through for the file type
			if (req.query.file) {
				// Validate if the files exists
				const filePath = `./public/tmp/${req.query.file}`
				if (fs.existsSync(filePath)) {
					return resolve(filePath)
				}
				return reject(`File '${req.query.file}' was not found.`)
			}
			return reject(`Please provide a file`)
		})
			// Return the file to download
			.then(filePath => {
				res.download(filePath)
			})
			// Catches errors and displays them
			.catch(e => {
				res.status(400).send({
					message: e
				})
			})
	)
})

module.exports = router

const ffmpeg = require('fluent-ffmpeg')

function encodeMPG(videoSource, videoQuality) {
	return new Promise((resolve, reject) => {
		console.log('encodeMPG()')
		// res.contentType('audio/mp3')
		// res.attachment('myfile.mp3')
		// var pathToAudio = 'https://dl.dropbox.com/s/pc7qp4wrf46t9op/test-clip.webm?dl=0'
		// ffmpeg(pathToAudio)
		// 	.toFormat('mp3')
		// 	.on('end', function(err) {
		// 		console.log('done!')
		// 		resolve()
		// 	})
		// 	.on('error', function(err) {
		// 		console.log('an error happened: ' + err.message)
		// 		reject(err)
		// 	})
		// 	.pipe(
		// 		res,
		// 		{ end: true }
		// 	)

		resolve({
			url: videoSource.tempFilePath,
			q: videoQuality
		})
	})
}

module.exports = encodeMPG

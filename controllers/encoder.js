const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')

function encodeMPG(videoSource, videoQuality) {
	return new Promise((resolve, reject) => {
		console.log('encodeMPG()')
		// var outStream = fs.createWriteStream('/public/tmp/output.mp4')
		// ffmpeg({ source: videoSource.tempFilePath })
		// 	.on('end', err => {
		// 		console.log('done!', outStream)
		// 		resolve({
		// 			url: videoSource.tempFilePath,
		// 			q: videoQuality
		// 		})
		// 	})
		// 	.on('error', err => {
		// 		console.log('err:', err.message)
		// 		reject(err)
		// 	})
		// 	// .writeToStream(outStream, { end: true })
		// 	.saveToFile(__dirname + '/tmp/output.mp4')

		resolve({
			url: videoSource.tempFilePath,
			videoQuality: videoQuality
		})
	})
}

module.exports = encodeMPG

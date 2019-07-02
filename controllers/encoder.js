const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const tempFilesDir = require('./tempFiles').tempFilesDir

function encodeMPG(videoSource, videoQuality) {
	const baseFileName = getFileName(videoSource.name)

	return new Promise((resolve, reject) => {
		console.log('encodeMPG()', videoSource)

		// quality is high to low: 1 - 31
		const adjustedVideoQuailty = Math.round(rel(31, 1, 1, 100, videoQuality))

		// console.log(' > videoQuality:', videoQuality)
		// console.log(' > adjustedVideoQuailty:', adjustedVideoQuailty)

		const fileName = `${baseFileName}_q${videoQuality}.mpg`
		var stream = fs.createWriteStream(`${tempFilesDir}/${fileName}`)
		ffmpeg.ffprobe(videoSource.tempFilePath, (err, metadata) => {
			const details = metadata.streams[0]

			console.log('details:', details)

			ffmpeg({ source: videoSource.tempFilePath })
				.withNoAudio()
				.toFormat('mpeg1video')
				.withVideoFilter('pad=ceil(iw/2)*2:ceil(ih/2)*2')
				.addOption('-q:v', adjustedVideoQuailty)
				.on('end', args => {
					console.log('done!', args)

					// TODO: get file size of encoded video to display
					// const stat = fs.statSync(stream)
					// console.log('stat:', stat)

					// ffmpeg.ffprobe(stream, (err2, metadata2) => {
					// console.log('2:', metadata2)
					resolve({
						stream,
						videoQuality,
						width: details.width,
						height: details.height,
						fileName
					})
					// })
				})
				.on('error', err => {
					console.log('err:', err.message)
					reject(err)
				})
				.writeToStream(stream, { end: true })
			// .saveToFile(`${tempFilesDir}/output_${videoQuality}.mpg`)
		})
	})
}

function rel(a0, a1, b0, b1, bX) {
	return ((bX - b0) / (b1 - b0)) * (a1 - a0) + a0
}

function getFileName(url) {
	let extension = url.lastIndexOf('.')
	let directory = url.lastIndexOf('/') + 1
	if (directory > extension) extension = undefined
	return url.substring(directory, extension)
}

module.exports = encodeMPG

/*
convert_command = [
	'/usr/local/bin/ffmpeg',
	'-i', self.source_path,
	'-f', 'mpeg1video',
	'-vf', 'crop=iw-mod(iw\,2):ih-mod(ih\,2)',
	'-q:v', str(self.encode_quality),
	target_location
]
*/

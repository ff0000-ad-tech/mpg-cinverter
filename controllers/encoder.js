const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const tempFilesDir = require('./tempFiles').tempFilesDir

function encodeMPG(videoSource, videoQuality) {
	return new Promise((resolve, reject) => {
		console.log('encodeMPG()')
		var outStream = fs.createWriteStream(`${tempFilesDir}/output_${videoQuality}.mpg`)
		ffmpeg({ source: videoSource.tempFilePath })
			.withNoAudio()
			.toFormat('mpeg1video')
			.withVideoFilter('pad=ceil(iw/2)*2:ceil(ih/2)*2')
			.outputOptions([`-q:v ${videoQuality}`])
			.on('end', args => {
				console.log('done!', outStream)
				resolve({
					stream: outStream,
					videoQuality: videoQuality
				})
			})
			.on('error', err => {
				console.log('err:', err.message)
				reject(err)
			})
			.writeToStream(outStream, { end: true })
		// .saveToFile(`${tempFilesDir}/output_${videoQuality}.mpg`)
	})
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

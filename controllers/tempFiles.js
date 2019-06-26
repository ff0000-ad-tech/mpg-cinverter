const fs = require('fs')
const path = require('path')

const tempFilesDir = 'public/tmp' // `${__dirname}/public/files/temp`

function clear() {
	console.log(Array(50).join('='))
	console.log('Clearing out temporary files.')
	console.log(Array(50).join('='))
	fs.readdir(tempFilesDir, (err, files) => {
		if (err) throw err

		for (const file of files) {
			fs.unlink(path.join(tempFilesDir, file), err => {
				if (err) throw err
			})
		}
	})
}

module.exports = {
	tempFilesDir,
	clear
}

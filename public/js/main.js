document.addEventListener('DOMContentLoaded', function() {
	console.log('LOADED')
	document.getElementById('uploadFormInput').onchange = function() {
		document.getElementById('uploadForm').submit()
	}
})

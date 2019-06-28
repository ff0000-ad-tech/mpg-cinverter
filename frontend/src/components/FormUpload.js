import React from 'react'

function FormUpload(props) {
	console.log('FormUpload', props)
	function handleInput(event) {
		console.log(event)
		console.warn('SUBMIT')
		const videoSource = event.target.files[0]
		let formData = new FormData()
		formData.append('videoSource', videoSource)

		fetch('/upload', {
			method: 'POST',
			body: formData
		}).then(val => {
			console.log('complete!', val)
			props.onComplete(videoSource)
		})
	}

	return (
		<form>
			<h2>Source Video</h2>
			<input type="file" name="videoSource" id="uploadFormInput" onInput={handleInput} />
		</form>
	)
}

export default FormUpload

//https://stackoverflow.com/questions/51115640/how-to-send-form-data-from-react-to-express
//https://www.robinwieruch.de/react-hooks-fetch-data/
//https://reactjs.org/docs/hooks-effect.html
//https://daveceddia.com/create-react-app-express-backend/

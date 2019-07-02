import React, { useRef } from 'react'

function FormUpload(props) {
	console.log(':: FormUpload ::', props)

	const formRef = useRef(null)

	function handleInput(event) {
		const videoSource = event.target.files[0]
		let formData = new FormData()
		formData.append('videoSource', videoSource)

		fetch('/upload', {
			method: 'POST',
			body: formData
		}).then(res => {
			console.log('FormUpload complete!', res, res.json())
			props.onComplete(videoSource)
			formRef.current.reset()
		})
	}

	return (
		<form ref={formRef}>
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

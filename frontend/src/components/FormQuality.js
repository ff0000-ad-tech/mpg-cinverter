import React, { useState, useRef } from 'react'

function FormQuality(props) {
	console.log(':: FormQuality ::', props)
	const [quality, setQuality] = useState(100)
	const formRef = useRef(null)

	function handleChange(event) {
		const rawValue = event.target.value
		// TODO add validation for 0-100
		setQuality(rawValue)
	}

	function handleSubmit(event) {
		event.preventDefault()

		fetch('/process', {
			method: 'POST',
			body: JSON.stringify({ videoQuality: quality }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log('FormQuality complete!', data)
				props.onComplete(data.encodes)
				formRef.current.reset()
			})
	}

	return (
		<form onSubmit={handleSubmit} id="quality-form" ref={formRef}>
			<h2>Create MPG</h2>
			<label>Video Quality</label>
			<input
				type="number"
				min="1"
				max="100"
				size="1"
				maxLength="3"
				name="videoQuality"
				required
				onChange={handleChange}
			/>
			<div id="quality-text">0 - 100</div>
			<button type="submit">Generate</button>
		</form>
	)
}

export default FormQuality

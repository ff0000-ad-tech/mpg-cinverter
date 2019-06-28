import React from 'react'

function FormQuality() {
	// determine if button should be disabled
	const btn = <button type="submit">Generate</button>

	return (
		<form method="POST" action="/process">
			<h2>Create MPG</h2>
			<label>Video Quality</label>
			<input type="number" name="videoQuality" required />
			<div id="quality-text">0 - 100</div>
			{btn}
		</form>
	)
}

export default FormQuality

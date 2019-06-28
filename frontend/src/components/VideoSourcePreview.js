import React from 'react'

function VideoSourcePreview(props) {
	console.log('VideoSourcePlayer', props)

	// checks if there is a File
	if (typeof props.src.name == 'string') {
		const url = URL.createObjectURL(props.src)
		return (
			<div>
				<video controls>
					<source src={url} type={props.src.mimetype} />
				</video>
				<p>
					{props.src.name}
					<br />
					{Math.round(props.src.size / 1000) + 'Kb'}
				</p>
			</div>
		)
	} else {
		return <div />
	}
}

export default VideoSourcePreview

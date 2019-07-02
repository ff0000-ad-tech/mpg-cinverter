import React from 'react'

function VideoSourcePlayer(props) {
	console.log(':: VideoSourcePlayer ::', props)

	// checks if there is a File
	if (typeof props.src.name == 'string') {
		const url = URL.createObjectURL(props.src)
		return (
			<div className="player-content">
				<video controls>
					<source src={url} type={props.src.mimetype} />
				</video>
				<div className="player-details">
					{props.src.name}
					<br />
					{Math.round(props.src.size / 1000) + 'Kb'}
				</div>
			</div>
		)
	} else {
		return <div />
	}
}

export default VideoSourcePlayer

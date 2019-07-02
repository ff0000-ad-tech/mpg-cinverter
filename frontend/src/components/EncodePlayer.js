import React, { useEffect, useRef } from 'react'
import MpegPlugin from '@ff0000-ad-tech/ad-video/lib/mpg/MpegPlugin.js'

function EncodePlayer(props) {
	console.log(':: EncodePlayer ::', props)

	const holderRef = useRef(null)
	const playerRef = useRef(null)

	useEffect(() => {
		console.log('EncodePlayer useEffect()!')
		if (playerRef.current === null) {
			playerRef.current = new MpegPlugin({
				source: props.data.stream.path,
				target: holderRef.current,
				autoplay: true,
				css: {
					width: props.data.width,
					height: props.data.height
				}
			})
			playerRef.current.canvas.style.position = 'relative'
		}
	}, [holderRef, props])

	function handleReplay() {
		playerRef.current.seek(0)
		playerRef.current.play()
	}

	function handleDownload(event) {
		const fileName = props.data.fileName
		console.log('handleDownload()', event)
		fetch(`/download?file=${fileName}`, {
			method: 'GET'
		})
			.then(response => response.blob())
			.then(blob => {
				const url = window.URL.createObjectURL(new Blob([blob]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', fileName)
				document.body.appendChild(link)
				link.click()
				link.parentNode.removeChild(link)
			})
	}

	return (
		<div className="player-content">
			<div ref={holderRef} />

			<div className="player-details">
				{props.data.fileName}
				<br />
				QUALITY: {props.data.videoQuality}
				<br />
				<button className="left" onClick={handleReplay}>
					Replay
				</button>
				<button className="right" onClick={handleDownload}>
					Download
				</button>
			</div>
		</div>
	)
}

export default EncodePlayer

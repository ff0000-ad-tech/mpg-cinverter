import React, { useEffect, useRef } from 'react'
import MpegPlugin from '@ff0000-ad-tech/ad-video/lib/mpg/MpegPlugin.js'

function EncodePlayer(props) {
	console.log(':: EncodePlayer ::', props)

	const holderRef = useRef(null)
	const playerRef = useRef(null)

	useEffect(() => {
		console.log('EncodePlayer useEffect()!')
		console.log('\t > holderRef:', holderRef)
		console.log('addPlayer()', holderRef)
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
			// console.log('player:', player.canvas)
		}
	}, [holderRef, props])

	return (
		<div>
			<div ref={holderRef} />

			<p>
				{props.data.fileName}
				<br />
				QUALITY: {props.data.videoQuality}
				<br />
			</p>
		</div>
	)
}

export default EncodePlayer

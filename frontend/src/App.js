import React, { useState, useEffect } from 'react'
import FormUpload from './components/FormUpload'
import FormQuality from './components/FormQuality'
import VideoSourcePlayer from './components/VideoSourcePlayer'
import EncodePlayer from './components/EncodePlayer'

function App() {
	const [videoSource, setVideoSource] = useState({})
	const [encodes, setEncodes] = useState([])

	useEffect(() => {
		console.log('App useEffect()!')
		console.log('encodes:', encodes)
	}, [encodes])

	const handleUploadComplete = obj => {
		console.log('handleUploadComplete():', obj)
		setVideoSource(obj)
	}

	const handleProcessComplete = obj => {
		console.log('handleProcessComplete():', obj)
		setEncodes(obj)
	}

	return (
		<div>
			<div id="header">
				<h1>MPG CONVERTER</h1>
				<p>"Auto-play" video solution for Android OS</p>
			</div>
			<hr />
			<div className="content-holder">
				<FormUpload onComplete={handleUploadComplete} />
				<div id="videos-holder">
					<VideoSourcePlayer src={videoSource} />
				</div>
			</div>
			<hr />
			<div className="content-holder">
				<FormQuality onComplete={handleProcessComplete} />
				<div id="videos-holder">
					{encodes.map((single, i) => (
						<EncodePlayer data={single} key={'encode' + i} />
					))}
				</div>
			</div>
		</div>
	)
}

export default App

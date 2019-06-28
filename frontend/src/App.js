import React, { useState, useEffect } from 'react'
import FormUpload from './components/FormUpload'
import FormQuality from './components/FormQuality'
import VideoSourcePreview from './components/VideoSourcePreview'

function App() {
	const [videoSource, setVideoSource] = useState({})

	useEffect(() => {
		console.log('App useEffect()!')
		// fetch('/users')
		// 	.then(res => res.json())
		// 	.then(parsedUsers => setUsers(parsedUsers))
	}, [])

	const handleUpload = obj => {
		console.log('handleUpload():', obj)
		setVideoSource(obj)
	}

	return (
		<div>
			<div id="header">
				<h1>MPG CONVERTER</h1>
				<p>"Auto-play" video solution for Android OS</p>
			</div>
			<hr />
			<div className="content-holder">
				<FormUpload onComplete={handleUpload} />
				<div id="videos-holder">
					<VideoSourcePreview src={videoSource} />
				</div>
			</div>
			<hr />
			<div className="content-holder">
				<FormQuality />
				<div id="videos-holder" />
			</div>
		</div>
	)
}

export default App

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_showcaseFetchTryCatch.scss';

function PageShowcaseFetchTryCatch() {
	const [temperature, setTemperature] = useState('');
	const [city, setCity] = useState('');
	const [displayCity, setDisplayCity] = useState('');

	const loadPageData = async () => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY} [${process.env.REACT_APP_MONGODB_URI}]`;
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setTemperature(data.main.temp)
			setDisplayCity(city);
		}
	}

	useEffect(() => {
		loadPageData();
	}, [city]);

	return (
		<div className="page page_showcaseFetchTryCatch">
			<h2 className="title">Showcase: Fetch Try/Catch</h2>
			<p className="description">An info page that displays showcase fetch try catch</p>
			<div className="dataArea">
				<div><input type="text" value={city} onChange={(e) => setCity(e.target.value)} /></div>
				<div>Temp for {displayCity}: {temperature}° C</div>
			</div>
		</div>
	)
}

export default PageShowcaseFetchTryCatch;
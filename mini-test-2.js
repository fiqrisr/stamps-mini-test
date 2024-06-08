const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?";

// location is DKI Jakarta
const params = new URLSearchParams({
	apiKey: "a5ecbc238e7c740862dd77ef3be0600e",
	lat: "-6.1753942",
	lon: "106.827183",
	units: "metric",
	lang: "id",
});

function formatDate(dateStr) {
	const date = new Date(dateStr);
	const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const dayOfWeek = weekdays[date.getDay()];
	const dayOfMonth = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
}

async function getWeatherData() {
	try {
		const res = await fetch(baseUrl + params.toString());
		return await res.json();
	} catch (err) {
		console.error(err);
	}
}

async function printWeather() {
	try {
		const weatherData = await getWeatherData();
		const fiveDaysForecast = {};

		weatherData.list.forEach((d) => {
			const forecastDate = d.dt_txt.split(" ")[0];

			if (!fiveDaysForecast[forecastDate]) {
				fiveDaysForecast[forecastDate] = d.main.temp;
			}
		});

		console.log("Weather forecast:");
		Object.entries(fiveDaysForecast).forEach(([key, val]) => {
			console.log(`${formatDate(key)}: ${val} °C`);
		});
	} catch (err) {
		console.error("Error on getting forecast data");
	}
}

await printWeather();

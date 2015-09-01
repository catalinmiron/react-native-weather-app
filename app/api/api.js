export default function fetchWeather(city) {
  let url = `http://api.openweathermap.org/data/2.5/find?q=${city}&units=metric`

  return fetch(url).then((response) => response.json())
}

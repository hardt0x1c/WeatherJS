const key = '1a22de0f6c444960b0d182032230504'


async function getWeatherCurrent(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}1`;
    const response = await fetch(url);
    const result = await response.json();

    return result
}


async function getWeatherForecast(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3`
    const response = await fetch(url);
    const result = await response.json();
    
    return result
}

getWeatherForecast('Новочеркасск')


async function showDataCurrent(city) {
    const result = await getWeatherCurrent(city)
    const paragraphData = document.getElementById('data')
    paragraphData.innerHTML = '';
    const conditionIcon = result.current.condition.icon

    const paragraphs = [
        `Город: ${result.location.name}`,
        `Страна: ${result.location.country}`,
        `Местное время: ${result.location.localtime}`,
        `Последнее обновление: ${result.current.last_updated}`,
        `Температура: ${result.current.temp_c}°C`,
        `Скорость ветра: ${result.current.wind_kph}`,
        `Направление ветра: ${result.current.wind_dir}`,
        `Давление: ${result.current.pressure_mb}`,
    ]

    paragraphs.forEach(element => {
        const paragraph = document.createElement('p')
        paragraph.textContent = element
        paragraphData.appendChild(paragraph)
    });
}


async function showDataDay(city) {
    const result = await getWeatherForecast(city)
    const paragraphData = document.getElementById('data')
    paragraphData.innerHTML = ''
    const conditionIcon = result.forecast.forecastday[0].day.condition.icon

    const paragraphs = [
        `Город: ${result.location.name}`,
        `Страна: ${result.location.country}`,
        `Дата: ${result.forecast.forecastday[0].date}`,
        `Местное время: ${result.location.localtime}`,
        `Последнее обновление: ${result.current.last_updated}`,
        `Максимальная температура: ${result.forecast.forecastday[0].day.maxtemp_c}`,
        `Минимальная температура: ${result.forecast.forecastday[0].day.mintemp_c}`,
        `Максимальная скорость ветра: ${result.forecast.forecastday[0].day.maxwind_kph}`,
        `Количество осадков: ${result.forecast.forecastday[0].day.totalprecip_mm}`,
        `Влажность: ${result.forecast.forecastday[0].day.avghumidity}`,
        `Температура в утром: ${result.forecast.forecastday[0].hour[6].temp_c}`,
        `Температура днем: ${result.forecast.forecastday[0].hour[12].temp_c}`,
        `Температура вечером: ${result.forecast.forecastday[0].hour[18].temp_c}`,
        `Температура ночью: ${result.forecast.forecastday[0].hour[23].temp_c}`
    ]

    paragraphs.forEach(element => {
        const paragraph = document.createElement('p')
        paragraph.textContent = element
        paragraphData.appendChild(paragraph)
    });
}


async function showDataThreeDays(city) {
    const result = await getWeatherForecast(city)
    const paragraphData = document.getElementById('data')
    paragraphData.innerHTML = ''
    const conditionIcon1 = result.forecast.forecastday[0].day.condition.icon
    const conditionIcon2 = result.forecast.forecastday[1].day.condition.icon
    const conditionIcon3 = result.forecast.forecastday[2].day.condition.icon

    const paragraphs = [
        `Город: ${result.location.name}`,
        `Страна: ${result.location.country}`,
        `Последнее обновление: ${result.current.last_updated}`,
        `Прогноз погоды на: ${result.forecast.forecastday[0].date}`,
        `Максимальная температура: ${result.forecast.forecastday[0].day.maxtemp_c}`,
        `Минимальная температура: ${result.forecast.forecastday[0].day.mintemp_c}`,
        `Прогноз погоды на: ${result.forecast.forecastday[1].date}`,
        `Максимальная температура: ${result.forecast.forecastday[1].day.maxtemp_c}`,
        `Минимальная температура: ${result.forecast.forecastday[1].day.mintemp_c}`,
        `Прогноз погоды на: ${result.forecast.forecastday[2].date}`,
        `Максимальная температура: ${result.forecast.forecastday[2].day.maxtemp_c}`,
        `Минимальная температура: ${result.forecast.forecastday[2].day.mintemp_c}`,
    ]

    paragraphs.forEach(element => {
        const paragraph = document.createElement('p')
        paragraph.textContent = element
        paragraphData.appendChild(paragraph)
    });
}


const btn = document.getElementById('getWeatherBtn')
btn.addEventListener('click', async () => {
    const city = document.getElementById('inputCity').value
    const selectedForecast = document.getElementById('selectedForecast').value
    if (selectedForecast==='На текущий момент') {
        await showDataCurrent(city)
    } else if (selectedForecast==='На текущий день') {
        await showDataDay(city)
        
    } else if (selectedForecast==='На 3 дня') {
        await showDataThreeDays(city)
    }
})
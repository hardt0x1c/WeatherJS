const key = '1a22de0f6c444960b0d182032230504'


async function getWeatherCurrent(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}1`;
    const response = await fetch(url);
    const result = await response.json();
    const currentCity = result.location.name;
    const currentCountry = result.location.country
    const localTime = result.location.localtime
    const lastUpdated = result.current.last_updated
    const tempC = result.current.temp_c
    const conditionIcon = result.current.condition.icon
    const wind = result.current.wind_kph
    const windDir = result.current.wind_dir
    const pressure = result.current.pressure_mb

    const data = {
        currentCity: currentCity,
        currentCountry: currentCountry,
        localTime: localTime,
        lastUpdated: lastUpdated,
        tempC: tempC,
        conditionIcon: conditionIcon,
        wind: wind,
        windDir: windDir,
        pressure: pressure
    }

    return data
}


async function getWeatherForecast(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3`
    const response = await fetch(url);
    const result = await response.json();
    const currentCity = result.location.name;
    const currentCountry = result.location.country
    const localTime = result.location.localtime
    const lastUpdated = result.current.last_updated
    const day1 = result.forecast.forecastday[0].date
    const day2 = result.forecast.forecastday[1].date
    const day3 = result.forecast.forecastday[2].date
    const maxTemp1 = result.forecast.forecastday[0].day.maxtemp_c
    const minTemp1 = result.forecast.forecastday[0].day.mintemp_c
    const maxTemp2 = result.forecast.forecastday[1].day.maxtemp_c
    const minTemp2 = result.forecast.forecastday[1].day.mintemp_c
    const maxTemp3 = result.forecast.forecastday[2].day.maxtemp_c
    const minTemp3 = result.forecast.forecastday[2].day.mintemp_c
    const maxWind = result.forecast.forecastday[0].day.maxwind_kph
    const totalPrecip = result.forecast.forecastday[0].day.totalprecip_mm
    const averageHumidity = result.forecast.forecastday[0].day.avghumidity
    const condition = result.forecast.forecastday[0].day.condition.icon
    const morningTemp = result.forecast.forecastday[0].hour[6].temp_c
    const dayTemp = result.forecast.forecastday[0].hour[12].temp_c
    const eveningTemp = result.forecast.forecastday[0].hour[18].temp_c
    const midnightTemp = result.forecast.forecastday[0].hour[23].temp_c

    const data = {
        currentCity: currentCity,
        currentCountry: currentCountry,
        localTime: localTime,
        lastUpdated: lastUpdated,
        day1: day1,
        day2: day2,
        day3: day3,
        maxTemp1: maxTemp1,
        minTemp1: minTemp1,
        maxTemp2: maxTemp2,
        minTemp2: minTemp2,
        maxTemp3: maxTemp3,
        minTemp3: minTemp3,
        maxWind: maxWind,
        totalPrecip: totalPrecip,
        averageHumidity: averageHumidity,
        condition: condition,
        morningTemp: morningTemp,
        dayTemp: dayTemp,
        eveningTemp: eveningTemp,
        midnightTemp: midnightTemp
    }
    
    return data
}

getWeatherForecast('Новочеркасск')


async function showDataCurrent(city) {
    const data = await getWeatherCurrent(city)
    const paragraphData = document.getElementById('data')
    paragraphData.innerHTML = '';
    const conditionIcon = data.conditionIcon

    const paragraphs = [
        `Город: ${data.currentCity}`,
        `Страна: ${data.currentCountry}`,
        `Местное время: ${data.localTime}`,
        `Последнее обновление: ${data.lastUpdated}`,
        `Температура: ${data.tempC}°C`,
        `Скорость ветра: ${data.wind}`,
        `Направление ветра: ${data.windDir}`,
        `Давление: ${data.pressure}`,
    ]

    paragraphs.forEach(element => {
        const paragraph = document.createElement('p')
        paragraph.textContent = element
        paragraphData.appendChild(paragraph)
    });
}


async function showDataDay(city) {
    const data = await getWeatherForecast(city)
    const paragraphData = document.getElementById('data')
    paragraphData.innerHTML = ''
    const conditionIcon = data.condition

    const paragraphs = [
        `Город: ${data.currentCity}`,
        `Страна: ${data.currentCountry}`,
        `Дата: ${data.day1}`,
        `Местное время: ${data.localTime}`,
        `Последнее обновление: ${data.lastUpdated}`,
        `Максимальная температура: ${data.maxTemp1}`,
        `Минимальная температура: ${data.minTemp1}`,
        `Максимальная скорость ветра: ${data.maxWind}`,
        `Количество осадков: ${data.totalPrecip}`,
        `Влажность: ${data.averageHumidity}`,
        `Температура в утром: ${data.morningTemp}`,
        `Температура днем: ${data.dayTemp}`,
        `Температура вечером: ${data.eveningTemp}`,
        `Температура ночью: ${data.midnightTemp}`
    ]

    paragraphs.forEach(element => {
        const paragraph = document.createElement('p')
        paragraph.textContent = element
        paragraphData.appendChild(paragraph)
    });
}


async function showDataThreeDays(city) {
    const data = await getWeatherForecast(city)
    const paragraphData = document.getElementById('data')
    paragraphData.innerHTML = ''
    const conditionIcon = data.condition

    const paragraphs = [
        `Город: ${data.currentCity}`,
        `Страна: ${data.currentCountry}`,
        `Последнее обновление: ${data.lastUpdated}`,
        `Прогноз погоды на: ${data.day1}`,
        `Максимальная температура: ${data.maxTemp1}`,
        `Минимальная температура: ${data.minTemp1}`,
        `Прогноз погоды на: ${data.day2}`,
        `Максимальная температура: ${data.maxTemp2}`,
        `Минимальная температура: ${data.minTemp2}`,
        `Прогноз погоды на: ${data.day3}`,
        `Максимальная температура: ${data.maxTemp3}`,
        `Минимальная температура: ${data.minTemp3}`,
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
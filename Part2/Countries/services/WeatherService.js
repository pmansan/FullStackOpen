import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (name) => {
    console.log(api_key)

    return axios.get(`${baseUrl}?q=${name}&appid=${api_key}`)
}


export default {
    getWeather: getWeather
}


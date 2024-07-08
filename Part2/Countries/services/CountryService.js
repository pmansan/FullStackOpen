import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const search = (name) => {
    return axios.get(`${baseUrl}/name/${name}`)
}

const allCountries = (name) => {
    return axios.get(`${baseUrl}/all`)
}

export default {
    search: search,
    allCountries: allCountries
}


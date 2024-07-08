import { useState, useEffect } from 'react'
import countryService from './services/CountryService.js'
import WeatherService from './services/WeatherService.js'

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService.allCountries().then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearch = (event) => {
    setQuery(event.target.value)
    Weather(event.target.value)
    setSelectedCountry(null)
  }

  const handleSelectCountry = (country) => {
    setSelectedCountry(country)
  }

  const Weather = (country) => {
    WeatherService.getWeather(country).then(response => {
      setWeather(response.data)
    })
  }

  const filteredCountries = query
    ? countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10)
    : []

  return (
    <>
      <div>
        find countries <input
          value={query} onChange={handleSearch}
        />
      </div>
      <div>
        {filteredCountries.length === 1 ? (
          <div>
            <h2>{filteredCountries[0].name.common}</h2>
            <p>Capital: {filteredCountries[0].capital[0]}</p>
            <p>Area: {filteredCountries[0].area} km²</p>
            <p>Languages: {Object.values(filteredCountries[0].languages).join(', ')}</p>
            <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name.common}`} />
            <h2>Weather in {filteredCountries[0].name.common}</h2>
            {weather && (
              <div>
                <p>Temperature: {weather.main.temp}</p>
                <p>Wind: {weather.wind.speed} m/s</p>
              </div>
            )}
          </div>
        ) :
          selectedCountry ? (
            <div>
              <h2>{selectedCountry.name.common}</h2>
              <p>Capital: {selectedCountry.capital[0]}</p>
              <p>Area: {selectedCountry.area} km²</p>
              <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
              <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
              <h2>Weather in {filteredCountries[0].name.common}</h2>
              {weather && (
                <div>
                  <p>Temperature: {weather.main.temp}</p>
                  <p>Wind: {weather.wind.speed} m/s</p>
                </div>
              )}
              <button onClick={() => setSelectedCountry(null)}>Back</button>
            </div>
          ) : (
            filteredCountries.map(country => (
              <div key={country.cca3}>
                <span>{country.name.common}</span>
                <button onClick={() => handleSelectCountry(country)}>Show</button>
              </div>
            ))
          )}
      </div>
    </>
  )
}

export default App

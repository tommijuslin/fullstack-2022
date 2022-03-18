import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const Weather = ({ country }) => {
  const [weather, setWeather] = useState()

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  if (weather !== undefined) {
    const icon = weather.weather['0'].icon
      return (
        <div>
          <p>temperature {weather.main.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )
  }

  return <></>
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>
        capital {country.capital}
        <br />
        area {country.area}
      </p>

      <h3>languages:</h3>

      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>

      <img src={country.flags.png} alt="flag" width='100' />

      <h2>Weather in {country.capital}</h2>

      <Weather country={country}/>
    </div>
  )
}

const Countries = ({ countriesToShow, setFilter }) => {
  const handleShowClick = (country) => {
    setFilter(country.name.common)
  }

  if (countriesToShow.length === 1) {
    return (
      <div>
        <Country country={countriesToShow[0]} />
      </div>
    )
  }

  if (countriesToShow.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }

  return (
    <div>
      {countriesToShow.map(country =>
        <p key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShowClick(country)}>show</button>
        </p>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = filter
    ? countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()))
    : []

  return (
    <div>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <Countries
        countriesToShow={countriesToShow}
        setFilter={setFilter}
      />
    </div>
  )
}

export default App

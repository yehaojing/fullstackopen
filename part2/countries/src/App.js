import { useState, useEffect } from 'react'
import axios from 'axios'

const HighlightButton = ({text, eventHandler}) => {
    return (
        <button onClick={eventHandler}>
            {text}
        </button>
    )
}

const highlightCountryHandler = (country, setHighlightCountry) => {
    return () => setHighlightCountry(country)
}

const HighlightCityWeather = ({weather}) => {
    const icon_url = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
        <>
            <h2>Weather in {weather.name}</h2>
            <div>
                Temperature: {weather.main.temp} Celcius
            </div>
            <img src={icon_url} alt="Weather"/>
            <div>
                Wind: {weather.wind.speed} m/s
            </div>
        </>
    )
}

const HighlightCountry = ({country, weather}) => {
    if (country === "" | weather=== "" ) {
        return <div>Please show a country.</div>
    } else {
        const flag_str = `Flag of ${country.name.common}`
        return (
            <>
                <h1>
                    {country.name.common}
                </h1>
                <div>
                    Capital - {country.capital}
                </div>
                <div>
                    Area - {country.area}
                </div>
                <h1>
                    Languages
                </h1>
                <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt={flag_str}/>
                <HighlightCityWeather weather={weather}/>
            </>
        )
    }
}

const Countries = ({countries, filter, setHighlightCountry}) => {
    const filtered_countries = countries.filter(country => country.name.common.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
    if (filtered_countries.length > 10) {
         return <div>Too many countries to list...</div>
    } else {
        return filtered_countries.map(country => 
            <div key={country.name.common}>{country.name.common}
                <HighlightButton text="show" eventHandler={highlightCountryHandler(country, setHighlightCountry)}/>
            </div>
        )
    }
}

const Filter = ({filter, setFilter}) => {
    return (
    <form>
        <div>
        Find countries: <input value={filter} onChange={(event) => setFilter(event.target.value)}/>
        </div>
    </form>
    )
}

const App = () => {
    const [filter, setFilter] = useState("")
    const [countries, setCountries] = useState([])
    const [highlightCountry, setHighlightCountry] = useState("")
    const [highlightCityWeather, setHiglightCityWeather] = useState("")

    const countriesHook = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('Countries promise fulfilled')
                setCountries(response.data)
        })
    }
      
    useEffect(countriesHook, [])

    const weatherHook = () => {
        if (highlightCountry === "") {
            setHiglightCityWeather("")
        } else {
            const request_url = `https://api.openweathermap.org/data/2.5/weather?q=${highlightCountry.capital}&appid=${process.env.REACT_APP_NOT_SECRET_CODE}&units=metric`
            axios
                .get(request_url)
                .then(response => {
                    console.log('Weather promise fulfilled')
                    setHiglightCityWeather(response.data)
                })
        }
    }
      
    useEffect(weatherHook, [highlightCountry])
    return (
        <div>
            <Filter filter={filter} setFilter={setFilter}/>
            <Countries countries={countries} filter={filter} setHighlightCountry={setHighlightCountry}/>
            <HighlightCountry country={highlightCountry} weather={highlightCityWeather}/>
        </div>
    )
}

export default App
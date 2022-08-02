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

const HighlightCountry = ({country}) => {
    console.log("highlighted country is ", country)
    if (country === "" ) {
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
                {Object.values(country.languages).map(language => <li>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt={flag_str}/>  
            </>
        )
    }
}

const Countries = ({countries, filter, setHighlightCountry}) => {
    const filtered_countries = countries.filter(country => country.name.common.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
    console.log(filtered_countries)
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

    const hook = () => {
        console.log('effect')
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
        })
    }
      
    useEffect(hook, [])
    console.log("app highlighted country is ", highlightCountry)

    return (
        <div>
        <Filter filter={filter} setFilter={setFilter}/>
        <Countries countries={countries} filter={filter} setHighlightCountry={setHighlightCountry}/>
        <HighlightCountry country={highlightCountry}/>
        </div>
    )
}

export default App
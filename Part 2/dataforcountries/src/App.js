import React, {useState} from 'react';
import axios from 'axios'

function App(props) {
  const imported = useState(props.data)
  const countriesData= imported[0]
  const [searchResults, setSearchResults]= useState([])
  let [ newSearch, setNewSearch ] = useState('')
  let [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  const handleSearchChange=(event) => {
    setNewSearch(event.target.value)
  }
  const handleSearch=(event) =>{
    newSearch= newSearch.toLowerCase()
    setSearchResults([])
    event.preventDefault()
    setSearchResults(countriesData.filter(countries => countries.name.toLowerCase().indexOf(newSearch) !== -1))
    setNewSearch('')
    setWeather([])
  }

  const handleClick=(countries)=> {
    setSearchResults([countries])
  }
  const PrintCountries=() =>{
    if(searchResults.length>10){
      return (<p> Too many  matches, specify another filter </p>)
    }
    if (searchResults.length===1){
      if (weather.length===0){
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${searchResults[0].capital}`).then(response=> setWeather(response.data))
      }
      return(
        <div>
          <div>
            <h1>{searchResults[0].name}</h1>
            <p><b>Capital - </b>{searchResults[0].capital}</p>
            <p> <b>Population - </b>{searchResults[0].population}</p>
            
            <h2>Languages</h2>
            <ul>
              {searchResults[0].languages.map(language=> <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={searchResults[0].flag} alt="Country Flag" width="450" height="300"></img>
            
          </div>
        </div>
      )

    }
    else {
      return(
        <div>
         {searchResults.map(
           countries=>
           <p key={countries.alpha2Code}>{countries.name} 
             <button onClick= {()=>handleClick(countries)}>
               show
             </button> 
            </p>
          )}
        </div>
      )
      }
  }

const PrintWeather=()=>{
  if(searchResults.length===1 && weather.length=== undefined){
      return (
      <div>
        <h2> {weather.location.name}'s weather</h2>
        <p><b>Temperature - </b> {weather.current.temperature} Celcius </p>
        <img src={weather.current.weather_icons[0]} alt="Country Flag" width="75" height="75"></img>
        <p><b>Wind - </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
      )
  }
  else{
    return(<p></p>)
  }

}

  return (
    <div>
      <form onSubmit= {handleSearch}>
        <div>
          find countries: 
          <input value= {newSearch} onChange= {handleSearchChange}/>
          <button type= 'submit'>search</button>
          <div>
          <PrintCountries/>
          <PrintWeather/>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;

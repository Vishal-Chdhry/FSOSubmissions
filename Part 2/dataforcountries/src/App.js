import React, {useEffect, useState} from 'react';
import axios from 'axios'

function App(props) {
  const imported = useState(props.data)
  const countriesData= imported[0]
  const [searchResults, setSearchResults]= useState([])
  let [ newSearch, setNewSearch ] = useState('')
  let [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const [city, setCity]= useState('')

  // useEffect(()=> {axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`).then(response=> setWeather(response.data))}, [])

  const handleSearchChange=(event) => {
    setNewSearch(event.target.value)
  }
  const handleSearch=(event) =>{
    newSearch= newSearch.toLowerCase()
    setSearchResults([])
    event.preventDefault()
    setSearchResults(countriesData.filter(countries => countries.name.toLowerCase().indexOf(newSearch) !== -1))
    setNewSearch('')
  }

  const handleClick=(countries)=> {
    setSearchResults([countries])
  }
  const PrintCountries=() =>{
    if(searchResults.length>10){
      return (<p> Too many  matches, specify another filter </p>)
    }
    if (searchResults.length===1){
      return(
        <div>
          <div>
            <h1>{searchResults[0].name}</h1>
            <p> Capital - {searchResults[0].capital}</p>
            <p> Population - {searchResults[0].population}</p>
            
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

  return (
    <div>
      <form onSubmit= {handleSearch}>
        <div>
          find countries: 
          <input value= {newSearch} onChange= {handleSearchChange}/>
          <button type= 'submit'>search</button>
          <div>
          <PrintCountries/>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;

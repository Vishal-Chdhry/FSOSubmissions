import React, { useEffect, useState } from 'react'
import Phonebook from './Components/PersonDetails'
import Form from './Components/Form'
import Filter from './Components/SearchFIlter'
import personServices from './services/persons'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ filterOutput, setFilterOutput ] = useState([])
  const [ notification, setNotification ] = useState(null)
  const [ error, setError ] = useState(null)
  
  useEffect(() => {  personServices.getAll().then(response =>{setPersons(response)})  }, [])
  const names= persons.map(nmes => nmes.name)

  const handleNameChange= (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange= (event) => {
    setNewNumber(event.target.value)
  }


  const handleFilter= (event) => {
    setNewSearch(event.target.value)
  }


  const SearchNames= (event)=> {
    setFilterOutput([])
    event.preventDefault()
    setFilterOutput(persons.filter(person => person.name.indexOf(newSearch) !== -1))
    setNewSearch('')
  }

  const Noti =({message}) => {
    if (message=== null){
      return null
    }
    return (
      <div className= "notification">
        {message}
      </div>
    )
  }

  const Err =({message}) => {
    if (message=== null){
      return null
    }
    return (
      <div className= "error">
        {message}
      </div>
    )
  }


  const addPerson =(event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    if (names.indexOf(newName) !== -1) {
      if(window.confirm(`${newName} is already added to phonebook, do you want to replace the number`)){
        setNotification(`${newName}' s number has been replaced`)
        return(
          personServices.update(persons[names.indexOf(newName)].id, nameObject),
          personServices.getAll().then(response =>{ setPersons(response)}),
          setNewName(''),
          setNewNumber('')
        )
      }
    
    }
    personServices.create(nameObject)
    .then(response => {
      setPersons(persons.concat(response))
      setNotification(`${newName} has been added to the phonebook`)
    })
    .catch(err => setError(err.response.data.error))
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = person =>{
    if (window.confirm(`Do you really want to delete ${person.name}`)) {
      personServices.del(person.id).catch(err => {
      setError(`Information about ${person.name} has already been removed from the server`)
      })
      personServices.getAll().then(response =>{ setPersons(response)})
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Noti message= {notification}/>
      <Err message= {error}/>
      <form onSubmit= {SearchNames}>
      <div>
        filter shown with: 
        <input
        value= {newSearch} 
        onChange= {handleFilter}
        /> 
        <br/>
        <button type= 'submit'>search</button> 
        <Filter filterOutput= {filterOutput}/>
      </div>
      </form>
      <div></div>

      <h2>add a new</h2>      
      <Form 
        addPerson= {addPerson} 
        newName={newName} 
        newNumber= {newNumber} 
        handleNameChange= {handleNameChange} 
        handleNumberChange= {handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {persons.map((note) =>
        <div key= {note.id}>
          <Phonebook 
          name= {note} 
          handleDelete= {() => handleDelete(note)}
          />
        </div> 
        )}
      </div>
    </div>
  )
}

export default App

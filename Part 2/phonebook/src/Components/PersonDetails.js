const Phonebook = ({name, handleDelete}) => {
     return (          
         <p> {name.name} {name.number} <button onClick= {handleDelete}>delete</button></p>  
     )
}


export default Phonebook
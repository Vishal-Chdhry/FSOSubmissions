const Filter = (props) => {
     return (<div>{(props.filterOutput).map(person=> <p key= {person.id}>{person.name} {person.number}</p>)}</div>)
}

export default Filter
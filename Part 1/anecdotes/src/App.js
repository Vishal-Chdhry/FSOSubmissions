import React, { useState } from 'react'

const points= new Array(6).fill(0)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote]= useState(0)

  const handlevotes= () => {
    const copy = [...points ]
    copy[selected] +=1
    points[selected] = copy[selected]
    setVote(points[selected])
    console.log(points, copy)
  }

  const handleanecdotes = () => {
    return (
      setSelected(Math.floor((Math.random() *anecdotes.length)))
    )
  }
  var index= points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}.<br/>
      has {points[selected]} votes <br/>
      <Button handleClick= {handlevotes} text= 'vote' />
      <Button handleClick= {handleanecdotes} text= 'next anecdote' /> <br/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[index]} <br/>
      has {points[index]} votes
    </div>
  )
}

export default App
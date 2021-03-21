import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic= (props) => (
      <tr>
        <td>{props.text}</td>
        <td>{props.stat}{props.end}</td>
      </tr>
)


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  

  if (good+bad+neutral === 0) {
    return (
      <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
        no feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <Statistic text= 'good' stat= {good}/>
      <Statistic text= 'neutral' stat= {neutral}/>
      <Statistic text= 'bad' stat= {bad}/>
      <Statistic text= 'average' stat= {(good*1 +bad*-1)/(good +bad+neutral)}/>
      <Statistic text= 'positive' stat= {good/(good +bad +neutral)*100} end='%'/>

    </div>
    
  )
}

export default App
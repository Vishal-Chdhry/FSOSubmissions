import React from 'react'
import course from './components/Courses'

const Course = () => {
  return (
    <div>
    {course.map(part => 
      <p>
        <Header courseArr= {part} />
        <Content courseArr= {part} />
        <Total courseArr= {part} />
      </p> 
    )}
    </div>
  )
}

const Header = ({courseArr}) => {
  return (
    <div>
      <h2>{courseArr.name}</h2>
    </div>

  )
}

const Total = ({courseArr}) => {
  const total = courseArr.parts.reduce((s, p) => {return s+p.exercises}, 0)
  return(
    <p>
      <b>Total of exercises {total}</b>
    </p>
  ) 
}

const Content = ({courseArr}) => {
  return (
    <div>
      {courseArr.parts.map(part => <p>{part.name} {part.exercises}</p>)}
    </div>
  )
}


const App = () => {
  return (
  <div>
    <h1>Web development curriculum</h1>
    <Course/>
  </div>
  )
}

export default App

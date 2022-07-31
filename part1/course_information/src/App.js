const arraySum = (array) => {
  return(
    array.reduce((left, right) => left + right, 0)
  )
}

const Course = ({courseObject}) => {
  return (
  <>
    <h1>
      {courseObject.name}
    </h1>
    <div>
      {courseObject.parts.map(part => <p>{part.name} {part.exercises}</p>)}
    </div>
    <div>
      <b>
        total of {arraySum(courseObject.parts.map(part => part.exercises))} exercises
      </b>
    </div>
  </>

  )
}

const App = () => {
  const course = {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
    ]
  }

  return (
    <div>
      <Course courseObject={course}/>
    </div>
  )
}

export default App
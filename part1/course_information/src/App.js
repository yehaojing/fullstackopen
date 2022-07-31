const arraySum = (array) => {
  return(
    array.reduce((left, right) => left + right, 0)
  )
}

const Course = (courseObject) => {
  return (
  <>
    <h1>
      {courseObject.name}
    </h1>
    <div>
      {courseObject.parts.map(part => <p key={part.name}>{part.name} {part.exercises}</p>)}
    </div>
    <div>
      <b>
        total of {arraySum(courseObject.parts.map(part => part.exercises))} exercises
      </b>
    </div>
  </>
  )
}

const Courses = ({coursesArray}) => coursesArray.map(course => <div key={course.name}>{Course(course)}</div>)

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses coursesArray={courses}/>
    </div>
  )
}

export default App
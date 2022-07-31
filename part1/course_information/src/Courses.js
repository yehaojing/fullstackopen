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

  
export default Courses
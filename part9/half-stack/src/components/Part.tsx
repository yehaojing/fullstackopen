import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = ({ course }: {course: CoursePart} ): JSX.Element => {
  switch (course.type) {
    case "normal":
      return (
        <div>
          <strong><div>{course.name} {course.exerciseCount}</div></strong>
          <i><div>{course.description}</div></i>
          <br/>
        </div>

      )
    case "groupProject":
      return (
        <div>
          <strong><div>{course.name} {course.exerciseCount}</div></strong>
          <div>project exercises {course.groupProjectCount}</div>
          <br/>
        </div>
      )
    case "submission":
      return (
        <div>
          <strong><div>{course.name} {course.exerciseCount}</div></strong>
          <i><div>{course.description}</div></i>
          <div>submit to {course.exerciseSubmissionLink}</div>
          <br/>
        </div>
      )
    case "special":
      return (
        <div>
          <strong><div>{course.name} {course.exerciseCount}</div></strong>
          <i><div>{course.description}</div></i>
          <div>required skills {course.requirements.toString()}</div>
          <br/>
        </div>
      )
    default:
      return assertNever(course);
  }
};
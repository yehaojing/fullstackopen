import { ContentProps, CoursePart } from "../types";
import { Part } from "./Part";

export const Content = (props: ContentProps): JSX.Element => {
  const courseParts: CoursePart[] = props.courseParts;

  return (
    <>
      {courseParts.map((coursePart: CoursePart) => (
        <Part course={coursePart} key={coursePart.name}/>
      ))}
    </>
  )
};

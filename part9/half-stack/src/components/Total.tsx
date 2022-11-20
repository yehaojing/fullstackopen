import { ContentProps } from "../types";

export const Total = (props: ContentProps): JSX.Element => {
  const courseParts = props.courseParts;
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export interface ContentProps {
  courseParts: Array<coursePart>;
}

export interface coursePart {
  name: string;
  exerciseCount: number;
}

export interface HeaderProps {
  courseName: string;
}

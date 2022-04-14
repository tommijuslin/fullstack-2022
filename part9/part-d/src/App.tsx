interface HeaderProps {
  name: string;
}

interface TotalProps {
  total: number;
}

interface ContentProps {
  parts: CoursePart[];
}

interface PartProps {
  courseParts: CoursePart;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescription {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescription {
  type: 'special';
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const Part = ({ courseParts }: PartProps) => {
  switch (courseParts.type) {
    case 'normal':
      return (
        <div>
          <div style={{ fontWeight: 'bold' }}>
            {courseParts.name} {courseParts.exerciseCount}
          </div>
          <div style={{ fontStyle: 'italic' }}>{courseParts.description}</div>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <div style={{ fontWeight: 'bold' }}>
            {courseParts.name} {courseParts.exerciseCount}
          </div>
          project exercises {courseParts.groupProjectCount}
        </div>
      );
    case 'submission':
      return (
        <div>
          <div style={{ fontWeight: 'bold' }}>
            {courseParts.name} {courseParts.exerciseCount}
          </div>
          <div style={{ fontStyle: 'italic' }}>{courseParts.description}</div>
          submit to {courseParts.exerciseSubmissionLink}
        </div>
      );
    case 'special':
      return (
        <div>
          <div style={{ fontWeight: 'bold' }}>
            {courseParts.name} {courseParts.exerciseCount}
          </div>
          <div style={{ fontStyle: 'italic' }}>{courseParts.description}</div>
          required skills: {courseParts.requirements.join(', ')}
        </div>
      );
    default:
      return assertNever(courseParts);
  }
};

const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part) => (
        <div key={part.name}>
          <Part courseParts={part} />
          <br />
        </div>
      ))}
    </div>
  );
};

const Total = ({ total }: TotalProps) => {
  return <p>Number of exercises {total}</p>;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal'
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject'
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission'
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special'
    }
  ];

  const exerciseTotal = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={exerciseTotal} />
    </div>
  );
};

export default App;

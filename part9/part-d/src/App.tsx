interface HeaderProps {
  name: string;
}

interface ContentProps {
  parts: { name: string; exerciseCount: number }[];
}

interface TotalProps {
  total: number;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14
    }
  ];

  const exerciseTotal = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={exerciseTotal} />
    </div>
  );
};

export default App;

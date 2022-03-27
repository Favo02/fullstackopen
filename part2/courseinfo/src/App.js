import Course from "./components/Course.js"

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
        name: 'State of a puffo',
        exercises: 14,
        id: 3
      },
      {
        name: 'State of a cane',
        exercises: 13,
        id: 4
      },
      {
        name: 'State of a gatto',
        exercises: 11,
        id: 5
      },
      {
        name: 'State of a component',
        exercises: 5,
        id: 6
      }
    ]
  }

  return <Course course={course} />
}

export default App
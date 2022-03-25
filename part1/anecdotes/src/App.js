import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const length = anecdotes.length
  const emptyArray = Array(length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(emptyArray)

  const randomNumer = (max) => {
    return Math.floor(Math.random() * max);
  }

  const randomAnecdote = () => {
    const number = randomNumer(length)
    setSelected(number)
  }

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1  
    setVotes(copy)
  }

  const mostVoted = () => {
    let maxVotes = 0
    let indexMaxVotes = 0
    votes.forEach((vote, i) => {
      if (vote > maxVotes) {
        maxVotes = vote
        indexMaxVotes = i
      }
    });
    return indexMaxVotes
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button clickHandler={voteAnecdote} text={"vote anecdote"}/>
      <Button clickHandler={randomAnecdote} text={"next anecdote"}/>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[mostVoted()]} vote={votes[mostVoted()]} />
    </>
  )
}

const Button = ({ clickHandler, text }) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const Anecdote = ({ anecdote, vote }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {vote} votes</p>
    </>
  )
}

export default App
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const items = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  const anecdotes = [...items]

  const anecdotesToShow = filter
    ? anecdotes.filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
    : anecdotes

  return (
    anecdotesToShow
      .sort((a, b) => { return b.votes - a.votes })
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )
  )
}

export default AnecdoteList

import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const items = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = (content, id) => {
    dispatch(vote(id))
    dispatch(showNotification(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
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
            <button onClick={() => handleVote(anecdote.content, anecdote.id)}>vote</button>
          </div>
        </div>
      )
  )
}

export default AnecdoteList

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteCount } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter(
      (anecdote) =>
        anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    )
  )
  anecdotes.sort((a, b) => (a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0))

  const vote = (anecdote) => {
    dispatch(voteCount(anecdote))
    dispatch(setNotification(`you just voted for '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
            {' - '} has {anecdote.votes}{' '}
            {anecdote.votes === 1 ? 'vote' : 'votes'} {'  '}
            <button onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Anecdotes

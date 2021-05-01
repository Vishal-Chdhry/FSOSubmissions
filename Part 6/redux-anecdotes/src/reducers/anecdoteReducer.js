import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) =>
          anecdote.id !== id ? anecdote : changedAnecdote
        )
    case 'NEW ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteCount = (anecdote) => {
  const changedAnecdote= {...anecdote,
    votes: anecdote.votes + 1
  }
  return (dispatch) => {
    console.log(anecdote)
    const anec = anecdoteService.update(changedAnecdote)
    const id= anecdote.id
    dispatch({
    type: 'VOTE',
    data: { id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default reducer

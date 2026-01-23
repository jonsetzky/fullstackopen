import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

      setNotification(`Anecdote '${anecdote.content}' voted`)
    },
  })

  if (anecdotes.isError) {
    return (
      <div>
        anecdote service not available due to problems in server
        <button onClick={() => anecdotes.refetch()}>Retry</button>
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.isLoading ? (
        <div>loading anecdotes...</div>
      ) : (
        anecdotes.data.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default App

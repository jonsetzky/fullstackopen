import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: async (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`Anecdote '${newAnecdote.content}' created`)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    createAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

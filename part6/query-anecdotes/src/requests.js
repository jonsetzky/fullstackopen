export const getAnecdotes = async () => {
  const response = await fetch('http://localhost:3001/anecdotes', {
    signal: AbortSignal.timeout(1500),
  })
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

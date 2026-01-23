const assert = console.assert

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAnecdotes = async () => {
  const response = await fetch('http://localhost:3001/anecdotes', {
    signal: AbortSignal.timeout(1500),
  })
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const createAnecdote = async (anecdote) => {
  const response = await fetch('http://localhost:3001/anecdotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: getId(),
      content: anecdote,
      votes: 0,
    }),
  })
  if (!response.ok) {
    if (response.body !== null) {
      throw (await response.json()).error
    }
    throw new Error('Failed to create anecdote')
  }
  return await response.json()
}

// updates based on newObject.id
export const updateAnecdote = async (newObject) => {
  assert('id' in newObject)
  assert('content' in newObject)
  assert('votes' in newObject)

  const response = await fetch(
    `http://localhost:3001/anecdotes/${newObject.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObject),
    },
  )

  return await response.json()
}

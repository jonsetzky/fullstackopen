const assert = console.assert;
const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  return await response.json();
};

const create = async (anecdote) => {
  const data = {
    content: anecdote,
    id: getId(),
    votes: 0,
  };

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

// updates based on newObject.id
const update = async (newObject) => {
  assert("id" in newObject);
  assert("content" in newObject);
  assert("votes" in newObject);

  const response = await fetch(`${baseUrl}/${newObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObject),
  });

  return await response.json();
};

export default { getAll, create, update };

const express = require("express");

const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "041-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  let id = Math.floor(Math.random() * 10000).toString();
  while (persons.find((person) => person.id === id)) {
    id = Math.floor(Math.random() * 10000).toString();
  }
  return id;
};

const getPersons = (id) => {
  if (id)
    return persons.find((person) => {
      return person.id === id;
    });
  return persons;
};

app.get("/api/persons", (req, res) => {
  res.json(getPersons());
});
app.get("/api/persons/:id", (req, res) => {
  const result = getPersons(req.params.id);
  if (!result) {
    return res.status(404).json({ error: "person not found" });
  }

  res.json(result);
});
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = [...persons].filter((person) => person.id !== id);
  res.end();
});
app.post("/api/persons", express.json(), (req, res) => {
  const newPerson = {
    ...req.body,
    id: generateId(),
  };

  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: "name or number is missing" });
  }

  if (persons.find((person) => person.name === newPerson.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  if (
    typeof newPerson.name !== "string" ||
    typeof newPerson.number !== "string"
  ) {
    return res.status(400).json({ error: "name and number must be strings" });
  }

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

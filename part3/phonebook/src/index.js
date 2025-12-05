const express = require("express");

const app = express();

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

const handlePersons = (id) => {
  if (id)
    return persons.find((person) => {
      return person.id === id;
    });
  return persons;
};

app.get("/api/persons", (req, res) => {
  res.json(handlePersons());
});
app.get("/api/persons/:id", (req, res) => {
  const result = handlePersons(req.params.id);
  if (!result) {
    res.status(404).send("person not found");
  } else {
    res.json(result);
  }
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p><p>${new Date().toISOString()}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

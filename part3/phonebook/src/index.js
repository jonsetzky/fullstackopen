require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const mongoose = require('mongoose')

const {
  addPerson,
  getAllPersons,
  getPersonById,
  deletePerson,
  getPersonByName,
  updatePerson,
} = require('./mongo.js')

// this fixes querySrv problem with mongoose
// https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042
require('node:dns/promises').setServers(['1.1.1.1'])

const mongodb_url = process.env.MONGODB_URL
mongoose.set('strictQuery', false)
mongoose
  .connect(mongodb_url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error)
  })

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ')
  }),
)

app.get('/api/persons', async (req, res) => {
  res.json(await getAllPersons())
})
app.get('/api/persons/:id', async (req, res, next) => {
  await getPersonById(req.params.id)
    .then((persons) => {
      const person = persons[0]
      if (!person) {
        return res.status(404).json({ error: 'person not found' })
      }
      res.json(person)
    })
    .catch(next)
})
app.delete('/api/persons/:id', async (req, res) => {
  await deletePerson(req.params.id)
  res.end()
})
app.post('/api/persons', express.json(), async (req, res) => {
  const newPerson = {
    ...req.body,
  }

  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  if (await getPersonByName(newPerson.name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  if (
    typeof newPerson.name !== 'string' ||
    typeof newPerson.number !== 'string'
  ) {
    return res.status(400).json({ error: 'name and number must be strings' })
  }

  res.json(await addPerson(newPerson.name, newPerson.number))
})

app.put('/api/persons/:id', express.json(), async (req, res) => {
  const updatedPerson = {
    ...req.body,
  }

  if (!updatedPerson.name || !updatedPerson.number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  const person = await getPersonById(req.params.id)
  if (!person) {
    return res.status(404).json({ error: 'person not found' })
  }

  if (
    typeof updatedPerson.name !== 'string' ||
    typeof updatedPerson.number !== 'string'
  ) {
    return res.status(400).json({ error: 'name and number must be strings' })
  }

  res.json(await updatePerson(req.params.id, updatedPerson))
})

const errorHandler = (err, req, res) => {
  if (err.name === 'CastError')
    return res.status(400).json({ error: 'invalid ID' })

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  console.error(err)
  res.status(500).json({ error: 'internal server error' })
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

require("dotenv").config();
const mongoose = require("mongoose");

// this fixes querySrv problem with mongoose
// https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042
require("node:dns/promises").setServers(["1.1.1.1"]);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

const getAllPersons = async () => {
  return await Person.find({});
};

const getPersonById = async (id) => {
  return await Person.find({ _id: id });
};

const getPersonByName = async (name) => {
  return await Person.find({ name }).then((persons) => persons[0]);
};

const addPerson = async (name, number) => {
  const person = new Person({
    name: name,
    number: number,
  });

  await person.save();
  console.log(`added ${name} number ${number} to phonebook`);
  return person;
};

const deletePerson = async (id) => {
  await Person.deleteOne({ _id: id });
};

async function main() {
  const name = process.argv[2];
  const number = process.argv[3];

  const mongodb_url = process.env.MONGODB_URL;
  mongoose.set("strictQuery", false);
  await mongoose.connect(mongodb_url, { family: 4 });

  if (!name && !number) {
    console.log("phonebook:");
    const persons = await getAllPersons();
    for (const person of persons) {
      console.log(`${person.name} ${person.number}`);
    }
    process.exit(0);
  } else if (!name || !number) {
    console.log("Please provide both name and number as arguments");
    process.exit(1);
  }

  await addPerson(name, number);
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = {
  getAllPersons,
  addPerson,
  getPersonById,
  getPersonByName,
  deletePerson,
};

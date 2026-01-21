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

const addPerson = async (name, number) => {
  const person = new Person({
    name: name,
    number: number,
  });

  await person.save();
  console.log(`added ${name} number ${number} to phonebook`);
};

const name = process.argv[2];
const number = process.argv[3];

(async () => {
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
})();

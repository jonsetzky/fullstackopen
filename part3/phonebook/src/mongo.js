require("dotenv").config();
const mongoose = require("mongoose");

// this fixes querySrv problem with mongoose
// https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042
require("node:dns/promises").setServers(["1.1.1.1"]);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,

    validate: {
      validator: function (v) {
        return /\d{2,3}-\d*/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Number must be formed by two parts separated by a dash (-) and the first part must be 2 or 3 digits long.`,
    },
  },
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

const updatePerson = async (id, newObject) => {
  return await Person.findByIdAndUpdate(id, newObject, {
    new: true,
    runValidators: true,
  });
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
  updatePerson,
};

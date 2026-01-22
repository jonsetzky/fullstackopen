const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: process.env.NODE_ENV === "test" ? "test_users" : "users",
  },
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model("User", userSchema);

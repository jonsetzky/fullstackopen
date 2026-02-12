const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

if (!fs.existsSync(path.resolve(process.cwd(), ".env"))) {
  throw new Error(
    "Missing .env file. It's required for connecting to MongoDB.",
  );
}

dotenv.config();

const PORT = process.env.PORT || 3003;
const MONGODB_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL;

module.exports = { MONGODB_URL, PORT };

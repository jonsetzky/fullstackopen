const config = require("./utils/config");
const express = require("express");
const middleware = require("./utils/middleware");

const mongoose = require("mongoose");

// this fixes querySrv problem with mongoose
// https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042
require("node:dns/promises").setServers(["1.1.1.1"]);

const mongoUrl = config.MONGODB_URL;
mongoose.connect(mongoUrl, { family: 4 });

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", require("./controllers/blogs").blogsController);
app.use("/api/users", require("./controllers/users").usersController);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

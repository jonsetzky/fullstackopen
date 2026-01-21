const express = require("express");
const middleware = require("./utils/middleware");

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", require("./controllers/blogs").blogsController);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

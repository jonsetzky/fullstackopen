import express from "express";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

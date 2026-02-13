import express from "express";

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.listen(3003, () => {
  console.log("Server is running on http://localhost:3003");
});

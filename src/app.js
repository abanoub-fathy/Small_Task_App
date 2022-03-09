require("dotenv").config();
const express = require("express");
const app = express();

// app configuration
app.use(express.json());

// routes
app.use("/api/v1/tasks", require("./routes/task"));

app.listen(
  process.env.PORT,
  console.log(`Server is up on port ${process.env.PORT}`)
);

require("dotenv").config();
const express = require("express");
const errorMiddleware = require("./middlewares/error");

// connect to the db
require("./db/db");

// app configuration
const app = express();
app.use(express.json());

// routes
app.use("/api/v1/tasks", require("./routes/task"));

// middlewares
app.use(require("./middlewares/not-found"));
app.use(errorMiddleware);

app.listen(
  process.env.PORT,
  console.log(`Server is up on port ${process.env.PORT}`)
);

const { connect } = require("mongoose");

connect(process.env.DB_URL)
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("can not connect to db"));

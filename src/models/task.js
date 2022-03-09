const mongoose = require("mongoose");

// create task schema
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "The description is required"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// create model
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

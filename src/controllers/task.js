const mongoose = require("mongoose");
const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send({
      numberOfTasks: tasks.length,
      tasks,
    });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getSingleTask = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: "Not valid id" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send({ error: "No task with this id" });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const updateTask = (req, res) => {
  res.send(`Update task ${req.params.id}`);
};

const deleteTask = (req, res) => {
  res.send(`Delete Task ${req.params.id}`);
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};

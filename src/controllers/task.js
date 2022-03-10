const mongoose = require("mongoose");
const Task = require("../models/task");
const asyncWrapper = require("../middlewares/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.send({
    numberOfTasks: tasks.length,
    tasks,
  });
});

const getSingleTask = asyncWrapper(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send({ error: "Not valid id" });
  }

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).send({ error: "No task with this id" });
  }
  res.send(task);
});

const createTask = asyncWrapper(async (req, res) => {
  const task = Task(req.body);
  await task.save();
  res.status(201).send(task);
});

const updateTask = asyncWrapper(async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["description", "completed"];

  // check if the update opertaion is valid
  const isValidUpdateReq = updates.every((update) =>
    validUpdates.includes(update)
  );

  if (!isValidUpdateReq) {
    return res.status(400).send({ error: "Invalid update request" });
  }

  // check for  valid id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send({ error: "Not valid id" });
  }

  // get the task to update
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).send({ error: "No task with this id" });
  }

  // update the task
  updates.forEach((update) => (task[update] = req.body[update]));

  // save the changes
  await task.save();

  // return the updated task
  res.send(task);
});

const deleteTask = asyncWrapper(async (req, res) => {
  // check for  valid id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send({ error: "Not valid id" });
  }

  // get the task to delete
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).send({ error: "No task with this id" });
  }

  // delete the task
  await task.remove();

  // return the deleted task
  res.send(task);
});

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};

const mongoose = require("mongoose");
const Task = require("../models/task");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/customError");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.send({
    numberOfTasks: tasks.length,
    tasks,
  });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(createCustomError("Not valid Id", 400));
  }

  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(createCustomError("Task not found", 404));
  }
  res.send(task);
});

const createTask = asyncWrapper(async (req, res) => {
  const task = Task(req.body);
  await task.save();
  res.status(201).send(task);
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["description", "completed"];

  // check if the update opertaion is valid
  const isValidUpdateReq = updates.every((update) =>
    validUpdates.includes(update)
  );

  if (!isValidUpdateReq) {
    return next(createCustomError("Invalid update request", 400));
  }

  // check for  valid id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(createCustomError("Not valid Id", 400));
  }

  // get the task to update
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(createCustomError("Not task with this id", 404));
  }

  // update the task
  updates.forEach((update) => (task[update] = req.body[update]));

  // save the changes
  await task.save();

  // return the updated task
  res.send(task);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  // check for  valid id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(createCustomError("Not valid Id", 400));
  }

  // get the task to delete
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(createCustomError("No task with this id", 404));
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

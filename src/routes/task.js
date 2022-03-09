const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

// all tasks
router.get("/", taskController.getAllTasks);

// single task
router.get("/:id", taskController.getSingleTask);

// create task
router.post("/", taskController.createTask);

// update task
router.patch("/:id", taskController.updateTask);

// delete task
router.delete("/:id", taskController.deleteTask);

module.exports = router;

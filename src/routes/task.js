const { Router } = require("express");
const taskController = require("../controllers/task");

// create new Router
const router = Router();

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

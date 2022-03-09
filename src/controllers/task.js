const getAllTasks = (req, res) => {
  res.send("All tasks");
};

const getSingleTask = (req, res) => {
  res.send(`Task ${req.params.id}`);
};

const createTask = (req, res) => {
  res.send(req.body);
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

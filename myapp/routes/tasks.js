var express = require('express');
var router = express.Router();

let tasks = [];

// GET tasks listing
router.get('/getTasks', function(req, res, next) {
  res.json(tasks);
});

// POST create a new task
router.post('/addTask', function(req, res, next) {
  let idTask = Date.now() + Math.random();
  const { title, description, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'Title, description, and due date are required' });
  }

  const newTask = {
    id: idTask.toString(),
    title,
    description,
    dueDate,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE delete a task
router.delete('/removeTask/:id', function(req, res, next) {
  const taskId = req.params.id;

  tasks = tasks.filter(task => task.id !== taskId);
  res.status(204).send();
});

// DELETE remove task without ID
router.delete('/removeTask', function(req, res, next) {
  res.status(400).json({ error: 'Task ID is required' });
});


module.exports = router;
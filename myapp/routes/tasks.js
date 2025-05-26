var express = require('express');
var router = express.Router();
const Task = require('../models/Tasks');

// GET tasks listing
router.get('/getTasks', async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create a new task
router.post('/addTask', async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE delete a task
router.delete('/removeTask/:id', async(req, res, next) => {
  try{
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully'});
  } catch (error) {
    console.error('Error deleting task:', error, req.params.id);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE remove task without ID
router.delete('/removeTask', function(req, res, next) {
  res.status(400).json({ error: 'Task ID is required' });
});


module.exports = router;
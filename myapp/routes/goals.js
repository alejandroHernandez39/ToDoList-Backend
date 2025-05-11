var express = require('express');
var router = express.Router();

let goals = [];
// GET goals listing
router.get('/getGoals', function(req, res, next) {
  res.json(goals);
});

// POST create a new goal
router.post('/addGoal', function(req, res, next) {
  const { title, description, dueDate } = req.body;
  const newGoal = {
    id: Date.now() + Math.random(),
    title,
    description,
    dueDate,
    completed: false
  };
  goals.push(newGoal);
  res.status(201).json(newGoal);
});

// DELETE delete a goal
router.delete('/removeGoal/:id', function(req, res, next) {
  const goalId = parseInt(req.params.id, 10);
  goals = goals.filter(goal => goal.id !== goalId);
  res.status(204).send();
});

module.exports = router;
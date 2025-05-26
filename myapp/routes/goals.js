var express = require('express');
var router = express.Router();
const Goal = require('../models/Goals');

let goals = [];
// GET goals listing
router.get('/getGoals', async(req, res, next) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create a new goal
router.post('/addGoal', async(req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const goal = new Goal({
      title,
      description,
      dueDate,
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE delete a goal
router.delete('/removeGoal/:id', async(req, res, next) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal:', error, req.params.id);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE remove goal without ID
router.delete('/removeGoal', function(req, res, next) {
  res.status(400).json({ error: 'Goal ID is required' });
});

module.exports = router;
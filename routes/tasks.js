const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task successfully created
 */

// Route for creating a task
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description, userId: req.user.userId });
    await task.save();
    res.json({ task });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The task title
 *         description:
 *           type: string
 *           description: The task description
 *         status:
 *           type: string
 *           enum: [pending, completed]
 *           description: The task status
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

// Route for retrieving tasks
router.get('/', auth, async (req, res) => {
  const { status } = req.query;
  const query = { userId: req.user.userId };
  if (status) query.status = status;
  try {
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Route for updating a task
router.put('/:id', auth, async (req, res) => {
  const { title, description, status } = req.body;
  const updates = {};

  if (title) updates.title = title;
  if (description) updates.description = description;
  if (status) updates.status = status;

  updates.updatedAt = Date.now();

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      updates,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({
        msg: 'Task not found',
      });
    }
    res.json(task);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Route for deletion of task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.json({ msg: 'Task removed' });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;

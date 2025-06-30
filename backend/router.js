const express = require('express');
const {
  AddTask, getTasks, deleteTasks, updateTask,
  completeTask, getCompleted, register, login
} = require('./controller/tasksController');

const getTaskCollection = require('./middleware/getTaskCollection'); // 👈 import middleware

const router = new express.Router();

// ✅ Task routes (require user, so use middleware)
router.post('/add-task', getTaskCollection, AddTask);
router.get('/get-tasks', getTaskCollection, getTasks);
router.delete('/delete-task/:id', getTaskCollection, deleteTasks);
router.put('/update-task/:id', getTaskCollection, updateTask);
router.post('/complete-task/:id', getTaskCollection, completeTask);
router.get('/get-completed', getTaskCollection, getCompleted);

// 🚫 Auth routes (DON’T use the middleware here)
router.post('/register', register);
router.post('/login', login);

module.exports = router;

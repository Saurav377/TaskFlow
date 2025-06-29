const express = require('express')
const { AddTask, getTasks, deleteTasks, updateTask, completeTask, getCompleted, deleteCompleted } = require('./controller/tasksController')

const router = new express.Router()

router.post('/add-task',AddTask)

router.get('/get-tasks',getTasks)

router.delete('/delete-task/:id', deleteTasks)

router.put('/update-task/:id',updateTask)

router.post('/complete-task/:id', completeTask)

router.get('/get-completed',getCompleted)

module.exports = router
const mongoose = require('mongoose')

// Task Schema
const taskSchema = new mongoose.Schema({
    taskName: {
        required: true,
        type: String
    },
    taskDescription: {
        type: String
    }
})

// Completed Task Schema
const completedSchema = new mongoose.Schema({
    taskName: {
        required: true,
        type: String
    },
    taskDescription: {
        type: String
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
})

// Models
const tasks = mongoose.model('tasks', taskSchema)
const completed = mongoose.model('completed', completedSchema)

// ✅ Export both
module.exports = {
    tasks,
    completed
}

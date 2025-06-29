const mongoose = require('mongoose')

// Task Schema
const taskSchema = new mongoose.Schema({
  taskName: {
    required: true,
    type: String
  },
  taskDescription: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false  // ✅ new field with default false
  }
});


// Models
const tasks = mongoose.model('tasks', taskSchema);
module.exports = tasks;


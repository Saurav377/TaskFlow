const mongoose = require('mongoose');

// Task Schema (same for everyone)
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
    default: false
  }
});

// User Schema (unchanged)
const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  }
});

// Dynamically get or create task model per user
const getTaskModelForUser = (username) => {
  const collectionName = `${username}_tasks`;
  return mongoose.models[collectionName] || mongoose.model(collectionName, taskSchema);
};

// Export models
const users = mongoose.model('users', userSchema);

module.exports = {
  users,
  getTaskModelForUser
};

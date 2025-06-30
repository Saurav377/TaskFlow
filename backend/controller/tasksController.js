const { tasks, users } = require('../model/tasksModel');
const jwt = require('jsonwebtoken')

exports.AddTask = async (req, res) => {
  console.log('Inside AddTasks Controller');
  const { taskName, taskDescription } = req.body
  console.log(taskName, taskDescription);

  try {
    const newTask = new req.taskModel({
      taskName,
      taskDescription
    })
    await newTask.save()
    res.status(200).json(newTask)
  } catch (err) {
    res.status(401).json(err)
  }
}

exports.getTasks = async (req, res) => {
  try {
    const allTasks = await req.taskModel.find({ completed: false });
    res.status(200).json(allTasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Server error", details: err });
  }
};


exports.deleteTasks = async (req, res) => {
  const { id } = req.params
  try {
    await req.taskModel.findByIdAndDelete({ _id: id })
    res.status(200).json('Task deleted successfully')
  } catch (err) {
    res.status(401).json(err)
  }
}

exports.updateTask = async (req, res) => {
  const { taskName, taskDescription } = req.body
  const { id } = req.params
  try {
    const existingTask = await req.taskModel.findByIdAndUpdate({ _id: id }, {
      taskName, taskDescription
    }, { new: true });
    await existingTask.save()
    res.status(200).json(existingTask)
  } catch (err) {
    res.status(401).json(err)
  }
}

exports.completeTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await req.taskModel.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task marked as completed", task: updatedTask });
  } catch (err) {
    console.error("Error completing task:", err);
    res.status(500).json({ error: "Something went wrong", details: err });
  }
};


exports.getCompleted = async (req, res) => {
  try {
    const completedTasks = await req.taskModel.find({ completed: true });
    res.status(200).json(completedTasks);
  } catch (err) {
    console.error("Error fetching completed tasks:", err);
    res.status(500).json({ error: "Server error", details: err });
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    const existingUserByEmail = await users.findOne({ email });
    const existingUserByUsername = await users.findOne({ username });

    if (existingUserByEmail) {
      res.status(406).json('Email already taken');
    } else if (existingUserByUsername) {
      res.status(406).json('Username already taken');
    } else {
      const newUser = new users({
        username,
        email,
        password
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json('Server error during registration');
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await users.findOne({ username });

    if (!existingUser) {
      return res.status(406).json("User not found");
    }

    if (existingUser.password !== password) {
      return res.status(406).json("Incorrect password");
    }

    const token = jwt.sign({ userId: existingUser._id }, "secretkey");
    res.status(200).json({ existingUser, token });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json("Server error during login");
  }
};

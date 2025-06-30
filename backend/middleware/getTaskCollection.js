const { getTaskModelForUser } = require('../model/tasksModel');

const getTaskCollection = (req, res, next) => {
  try {
    const userHeader = req.headers.user;

    if (!userHeader) {
      console.warn("Missing user header in request");
      return res.status(400).json({ error: "User not found in request headers" });
    }

    const user = JSON.parse(userHeader);
    if (!user.username) {
      return res.status(400).json({ error: "Invalid user format" });
    }

    const taskModel = getTaskModelForUser(user.username);
    req.taskModel = taskModel;
    next();
  } catch (err) {
    console.error("getTaskCollection error:", err);
    res.status(500).json({ error: "Server error in task collection setup", details: err.message });
  }
};

module.exports = getTaskCollection;

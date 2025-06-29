const tasks = require('../model/tasksModel');


exports.AddTask = async(req,res)=>{
    console.log('Inside AddTasks Controller');
    const {taskName,taskDescription} = req.body
    console.log(taskName,taskDescription);
    
    try{
        const newTask = new tasks({
            taskName,
            taskDescription
        })
        await newTask.save()
        res.status(200).json(newTask)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getTasks = async (req, res) => {
  try {
    const allTasks = await tasks.find({ completed: false });
    res.status(200).json(allTasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Server error", details: err });
  }
};


exports.deleteTasks = async(req,res)=>{
    const {id} = req.params
    try{
        await tasks.findByIdAndDelete({_id:id})
        res.status(200).json('Task deleted successfully')
    }catch(err){
        res.status(401).json(err)
    }
}

exports.updateTask = async(req,res) =>{
    const {taskName,taskDescription} = req.body
    const {id} = req.params
    try{
        const existingTask = await tasks.findByIdAndUpdate({_id:id},{
            taskName,taskDescription
    },{new:true});
        await existingTask.save()
        res.status(200).json(existingTask)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.completeTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await tasks.findByIdAndUpdate(
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
    const completedTasks = await tasks.find({ completed: true });
    res.status(200).json(completedTasks);
  } catch (err) {
    console.error("Error fetching completed tasks:", err);
    res.status(500).json({ error: "Server error", details: err });
  }
};

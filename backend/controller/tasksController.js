const { tasks, completed } = require('../model/tasksModel');


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

exports.getTasks = async(req,res) =>{
    try{
        const allTasks = await tasks.find()
        res.status(200).json(allTasks)
    }catch(err){
        res.status(401).json(err)
    }
}

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

exports.completeTask = async(req,res) =>{
    const {id} = req.params
    try{
        const currentTask = await tasks.findById({_id:id})
        const completedTask = new completed({
            taskName: currentTask.taskName,
            taskDescription: currentTask.taskDescription
        })
        await tasks.findByIdAndDelete({_id:id})
        await completedTask.save()
        res.status(200).json('Task deleted successfully')
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getCompleted = async(req,res) =>{
    try{
        const allTasks = await completed.find()
        res.status(200).json(allTasks)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.deleteCompleted = async(req,res)=>{
    const {id} = req.params
    try{
        await completed.findByIdAndDelete({_id:id})
        res.status(200).json('Task deleted successfully')
    }catch(err){
        res.status(401).json(err)
    }
}
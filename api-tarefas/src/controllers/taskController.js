const tasks = require('../models/task')

exports.getTasks = (req, res)=>res.json(tasks)

exports.createTask = (req, res)=>{
    const {title} = req.body;
    const newTask = {id: tasks.length+1,
        title
    }
    tasks.push(newTask)
    res.status(201).json(newTask)
}
exports.updateTaskById = (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    const task = tasks.find(task => task.id === id)
    if(!task) return res.status(404).json({erro: 'Tarefa não encontrada'})
    task.title = title
    res.json(task)
}
exports.deleteTaskById = (req, res) => {
    const {id} = req.params;
    const index = tasks.findIndex(task => task.id === id)
    if(index === -1) return res.status(404).json({erro: 'Tarefa não encontrada'})
    tasks.splice(index,1)
    res.status(204).end()
}
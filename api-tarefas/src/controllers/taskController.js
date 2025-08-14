const TaskModel = require('../models/taskModel');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

exports.createTask = async (req, res) => {
  const { title, term } = req.body;
  try {
    const newTask = new TaskModel({ title, term });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

exports.updateTaskById = async (req, res) => {
  const { id } = req.params;
  const { title, term } = req.body;
  try {
    const task = await TaskModel.findByIdAndUpdate(id, { title, term }, { new: true });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

exports.deleteTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};

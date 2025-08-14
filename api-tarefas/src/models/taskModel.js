const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  term: {
    type: Date,
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
import React, { useState } from 'react';

const AddTaskForm = ({ addTask, user }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        dateAdded: new Date().toLocaleDateString(),
        completed: false,
      };

      addTask(newTask);
      setTaskName('');
      setTaskDescription('');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Task</h2>
      <form>
        <div class="form-container">
          <div class="form-group">
            <label for="taskName">Task Name:</label>
            <input
              type="text"
              id="taskName"
              placeholder="Enter task name..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          <div class="form-group">
            <label for="taskDescription">Task Description:</label>
            <textarea
              id="taskDescription"
              placeholder="Enter task description..."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
          </div>

          <button class="add-task-button" type="button" onClick={handleAddTask}>
            Add Task
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddTaskForm;

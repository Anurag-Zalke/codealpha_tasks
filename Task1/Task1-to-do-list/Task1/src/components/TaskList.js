import React from 'react';

const Task = ({ task, index, deleteTask, markAsCompleted, moveTask }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData('text/plain');
    moveTask(Number(draggedIndex), index);
  };

  return (
    <li
      key={task.id}
      className={`task-item ${task.completed ? 'completed' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="task-details">
        <div className="task-info">
          <span className="task-name">{task.name}</span>
          <p className="task-description">{task.description}</p>
        </div>
        <div className="task-actions">
          <span className="task-date">Date Added: {task.dateAdded}</span>
          <div className="task-buttons">
            <button className="delete-button" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
            <button
              className="complete-button"
              onClick={() => markAsCompleted(task.id)}
            >
              {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

const TaskList = ({ tasks, deleteTask, markAsCompleted, moveTask, filter }) => {
  const filteredTasks =
    filter === 'completed'
      ? tasks.filter((task) => task.completed)
      : filter === 'incomplete'
      ? tasks.filter((task) => !task.completed)
      : tasks;

  return (
    <ul className="task-list">
      {filteredTasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          deleteTask={deleteTask}
          markAsCompleted={markAsCompleted}
          moveTask={moveTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;

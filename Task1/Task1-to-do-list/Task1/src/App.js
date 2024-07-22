import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

const App = () => {
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const markAsCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  const filterTasks = (status) => {
    setFilter(status);
  };

  const filteredTasks = filter === 'completed' ? tasks.filter(task => task.completed) :
                         filter === 'incomplete' ? tasks.filter(task => !task.completed) : tasks;

  return (
    <div className="App">
      <h1>To Do List</h1>
      <AddTaskForm addTask={addTask} />
      <div className='filter'>
        <button onClick={() => filterTasks('all')}>All</button>
        <button onClick={() => filterTasks('completed')}>Completed</button>
        <button onClick={() => filterTasks('incomplete')}>Incomplete</button>
      </div>
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        markAsCompleted={markAsCompleted}
        moveTask={moveTask}
      />
    </div>
  );
};

export default App;

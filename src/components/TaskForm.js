import React, { useState, useEffect } from 'react';
import './TaskForm.css'
function TaskForm({ addTask, updateTask, currentTask, setCurrentTask, isEditing, setIsEditing, setIsModalOpen }) {
  const [task, setTask] = useState({ title: '', description: '' });

  useEffect(() => {
    if (isEditing) {
      setTask(currentTask);
    } else {
      // setTask({ title: '', description: '' });
    }
  }, [isEditing, currentTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      // Task title is empty, handle error (e.g., display an alert)
      alert("Please enter a task title.");
      return; // Stop further execution
    }

    if (isEditing) {
      updateTask(task);
    } else {
      addTask(task);
    }
    setTask({ title: '', description: '' });
  };
  return (
    <form onSubmit={handleSubmit} className='taskForm'>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      ></textarea>
      <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
      {isEditing && <button onClick={() => { setIsEditing(false); setIsModalOpen(false) }}>Cancel</button>}
    </form>
  );
}

export default TaskForm;

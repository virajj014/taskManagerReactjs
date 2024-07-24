// App.js
import logo from '../assets/TodoLogo.png';
import './Main.css';
import TaskForm from './TaskForm';
import React, { useState, useEffect } from 'react';
import Task from './Task';
import { colorCodes } from '../assets/colorCodes'; // Importing colorCodes from colors.js

const Main = ({ setIsLoggedIn }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        setIsLoggedIn(false); // Assuming you have a state variable named isLoggedIn
    };


    const getRandomColor = () => colorCodes[Math.floor(Math.random() * colorCodes.length)];

    const [tasks, setTasks] = useState(() => {
        // Load tasks from local storage when the component mounts
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });



    console.log(tasks)
    const [currentTask, setCurrentTask] = useState({ title: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        // Save tasks to local storage whenever they change
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks to local storage:', error);
        }
    }, [tasks]);

    const addTask = (task) => {
        const storedUsername = localStorage.getItem('username');

        if (storedUsername) {
            setTasks([...tasks, { ...task, id: Date.now(), completed: false, date: Date.now(), username: storedUsername }]);
            setIsModalOpen(false)

        }
    };

    const updateTask = (task) => {
        setTasks(tasks.map(t => t.id === task.id ? task : t));
        setIsEditing(false);
        setIsModalOpen(false)
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const markTaskCompleted = (taskId) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
    };

    const filteredTasks = tasks.filter(task => {
        const storedUsername = localStorage.getItem('username');

        if (storedUsername) {
            if (filter === 'Completed') {
                return task.completed && task.username === storedUsername;
            } else if (filter === 'Active') {
                return !task.completed && task.username === storedUsername;
            } else {
                return task.username === storedUsername;
            }
        }

    });

    return (
        <div className="main">
            <img src={logo} className="logo" alt="Todo Logo" />
            <button className="logoutBtn" onClick={handleLogout}>Logout</button> {/* Add this button */}
            <div className="filter-buttons">
                <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All Tasks</button>
                <button onClick={() => setFilter('Completed')} className={filter === 'Completed' ? 'active' : ''}>Completed Tasks</button>
                <button onClick={() => setFilter('Active')} className={filter === 'Active' ? 'active' : ''}>Active Tasks</button>
            </div>

            <div className='taskItems'>
                {filteredTasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        setCurrentTask={setCurrentTask}
                        setIsEditing={setIsEditing}
                        deleteTask={deleteTask}
                        markTaskCompleted={markTaskCompleted}
                        setIsModalOpen={setIsModalOpen}
                        color={getRandomColor()}
                    />
                ))}
            </div>

            <button className="addTaskBtn" onClick={toggleModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="closeTaskBtn" onClick={toggleModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img src={logo} className="logo1" alt="Todo Logo" />
                        <TaskForm
                            addTask={addTask}
                            updateTask={updateTask}
                            currentTask={currentTask}
                            setCurrentTask={setCurrentTask}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;

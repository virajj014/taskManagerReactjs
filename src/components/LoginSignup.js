// LoginSignup.js
import React, { useState } from 'react';
import './LoginSignup.css';
import logo from '../assets/TodoLogo.png';

const LoginSignup = ({ setIsLoggedIn }) => {
    const [isLoginSelected, setIsLoginSelected] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleToggle = () => {
        setIsLoginSelected(!isLoginSelected);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isLoginSelected) {

            const allUsers = JSON.parse(localStorage.getItem('allusers')) || [];
            const user = allUsers.find(user => user.username === username && user.password === password);
            if (user) {
                alert('Login successful');
                localStorage.setItem('username',username)
                setIsLoggedIn(true);
                // Redirect or set logged in state
            } else {
                alert('Invalid username or password');
            }


        } else {
            // Signup logic
            const allUsers = JSON.parse(localStorage.getItem('allusers')) || [];
            const userExists = allUsers.some(user => user.username === username);
            if (userExists) {
                alert('Username already exists. Please choose a different one.');
            } else {

                localStorage.setItem('allusers', JSON.stringify([...allUsers, { username: username, password: password }]));
                alert('Signup successful');
                // Redirect or set logged in state
            }
        }
    };

    return (
        <div className="authPage">
            <img src={logo} className="logo" alt="Todo Logo" />

            <div className="toggleButtons">
                <button onClick={handleToggle} className={isLoginSelected ? 'active' : ''}>
                    Login
                </button>
                <button onClick={handleToggle} className={!isLoginSelected ? 'active' : ''}>
                    Signup
                </button>
            </div>


            <form onSubmit={handleFormSubmit} className="authform">
                <input
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />
                <button type="submit">{isLoginSelected ? 'Login' : 'Signup'}</button>
            </form>

        </div>
    );
};

export default LoginSignup;

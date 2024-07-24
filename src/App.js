import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import LoginSignup from './components/LoginSignup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Main setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LoginSignup setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default App;

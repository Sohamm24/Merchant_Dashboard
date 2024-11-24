import './Login.css';
import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    contact:'',
    password: ''
  });

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const navigate = useNavigate(); // Create a navigate instance


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Login successful', data);
        localStorage.setItem('token', data.jwtToken);
        localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
        setIsLoggedIn(true);
        setUser({ name: data.name, email: data.email });
        setShowSuccessPopup(true); 
        setTimeout(() => setShowSuccessPopup(false), 3000);
        navigate('/dashboard');
      } else {
        console.log('Login failed', data.message);
      }
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Login successful', data);
      } else {
        console.log('Registration failed', data.message);
      }
    } catch (err) {
      console.error('Error registering:', err);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="login-content">
      {isLoggedIn ? (
        <div>
          <h4>Welcome, {user?.name}</h4>
          <button onClick={handleSignOut} className="logout-button">
            Sign Out
          </button>
          {showSuccessPopup && (
            <div className={`popup success`}>
              Logged in successfully!
            </div>
          )}
        </div>
      ) : (
        <div>
          {isRegistering ? (
            <div>
              <h4 className="login-header">Register</h4>
              <form className="login-form" onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label htmlFor="reg-username">Username</label>
                  <input
                    id="reg-username"
                    type="text"
                    placeholder="Enter your username"
                    value={signupInfo.name}
                    onChange={(e) => setSignupInfo({ ...signupInfo, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupInfo.email}
                    onChange={(e) => setSignupInfo({ ...signupInfo, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact">Contact</label>
                  <input
                    id="contact"
                    type="number"
                    placeholder="Enter your Mobile no."
                    value={signupInfo.contact}
                    onChange={(e) => setSignupInfo({ ...signupInfo, contact: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-password">Password</label>
                  <input
                    id="reg-password"
                    type="password"
                    placeholder="Enter your password"
                    value={signupInfo.password}
                    onChange={(e) => setSignupInfo({ ...signupInfo, password: e.target.value })}
                  />
                </div>
                <button type="submit" className="login-submit">Sign Up</button>
                <button type="button" onClick={() => setIsRegistering(false)} className="toggle-button">Back to Log In</button>
              </form>
            </div>
          ) : (
            <div>
              <h4 className="login-header">Log In</h4>
              <form className="login-form" onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Enter your email"
                    value={loginInfo.email}
                    onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginInfo.password}
                    onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                  />
                </div>
                <button type="submit" className="login-submit">Log In</button>
                <h4 className="signin-header">Don't have an account?</h4>
                <button type="button" onClick={() => setIsRegistering(true)} className="toggle-button">Sign Up</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';


function Login({ setToken }) {
  const [username, setUsername] = useState(process.env.REACT_APP_PASSWORD || '');
  const [password, setPassword] = useState(process.env.REACT_APP_USERNAME || '');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username,
        password,
      });
      setToken(response.data.token); // Save token in parent component
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="mb-3">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
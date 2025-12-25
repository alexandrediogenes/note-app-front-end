// src/pages/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // CSS global

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password }
      );
      localStorage.setItem('token', response.data.token);
      alert('Login realizado com sucesso!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro no login');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <p>
        Não tem conta?{' '}
        <a href="/register" style={{ color: '#008f75' }}>
          Registrar
        </a>
      </p>
    </div>
  );
};

export default Login;

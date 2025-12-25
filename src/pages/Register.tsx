// src/pages/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        { name, email, password }
      );
      localStorage.setItem('token', response.data.token);
      alert('Registro realizado com sucesso!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao registrar usuário');
    }
  };

  return (
    <div className="container">
      <h2>Registrar</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" className="register-btn">
          Registrar
        </button>
      </form>
      <p>
        Já tem conta? <a href="/" style={{ color: '#008f75' }}>Login</a>
      </p>
    </div>
  );
};

export default Register;

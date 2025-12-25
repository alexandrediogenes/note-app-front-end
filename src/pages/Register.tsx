import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      alert('Registro realizado com sucesso!');
      navigate('/');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro ao registrar usuário');
    }
  };

  return (
    <div className="container">
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Registrar</button>
      </form>
      <p>Já tem conta? <Link to="/">Login</Link></p>
    </div>
  );
};

export default Register;

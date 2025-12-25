import React, { useState, useContext } from 'react';
import api, { setToken } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken: saveToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      saveToken(res.data.token);
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro no login');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem conta? <Link to="/register">Registrar</Link></p>
    </div>
  );
};

export default Login;

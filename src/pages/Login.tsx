import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setToken } from '../api/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken: setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setAuthToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token); // Atualiza o axios header
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro no login');
    }
  };

  return (
    <div className="container">
      <h2>Entrar</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="btn-primary">Entrar</button>
      </form>

      <p style={{ marginTop: '10px' }}>
        Não tem conta?{' '}
        <button 
          className="btn-primary" 
          onClick={() => navigate('/register')}
          style={{ padding: '5px 15px', fontSize: '0.9rem' }}
        >
          Registrar
        </button>
      </p>
    </div>
  );
};

export default Login;

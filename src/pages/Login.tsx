import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>

      <p>
        Não tem conta? <Link to="/register">Registrar</Link>
      </p>
    </form>
  );
};

export default Login;

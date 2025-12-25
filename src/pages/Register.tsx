import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/auth/register', {
        email,
        password,
      });

      navigate('/');
    } catch (error) {
      alert('Erro ao registrar usuário');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrar</h2>

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

      <button type="submit">Registrar</button>

      <p>
        Já tem conta? <Link to="/">Login</Link>
      </p>
    </form>
  );
};

export default Register;

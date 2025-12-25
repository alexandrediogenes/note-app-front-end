import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password }
      );

      localStorage.setItem('token', res.data.token);

      console.log('LOGIN OK, REDIRECIONANDO...');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Entrar</button>
      </form>

      <p>
        Não tem conta? <Link to="/register">Registrar</Link>
      </p>
    </div>
  );
};

export default Login;

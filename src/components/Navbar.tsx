import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h2>Note App</h2>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;

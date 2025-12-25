// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

interface Note {
  _id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  // Buscar notas
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao buscar notas');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Criar nota
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/notes`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([res.data, ...notes]);
      setTitle('');
      setContent('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar nota');
    }
  };

  // Deletar nota
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao deletar nota');
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleAddNote}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">
          Adicionar Nota
        </button>
      </form>

      <hr style={{ margin: '1rem 0', borderColor: '#444' }} />

      <h3>Minhas Notas</h3>
      {notes.length === 0 && <p>Nenhuma nota encontrada.</p>}

      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            backgroundColor: '#3b3b5e',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem',
          }}
        >
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <small>Criada em: {new Date(note.createdAt).toLocaleString()}</small>
          <br />
          <button
            onClick={() => handleDelete(note._id)}
            className="register-btn"
            style={{ marginTop: '0.5rem' }}
          >
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

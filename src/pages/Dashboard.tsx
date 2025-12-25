import React, { useEffect, useState, useContext } from 'react';
import api, { setToken } from '../api/api';
import { AuthContext } from '../context/AuthContext';

interface Note {
  _id: string;
  title: string;
  content: string;
  color: string;
  isPinned: boolean;
}

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (token) setToken(token);
    fetchNotes();
  }, [token]);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard dark">
      <h1>Notas</h1>
      <div className="notes-grid">
        {notes.map(note => (
          <div key={note._id} className="note" style={{ backgroundColor: note.color }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

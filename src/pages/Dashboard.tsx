import React, { useEffect, useState, useContext } from 'react';
import api, { setToken } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import Navbar from '../components/Navbar';

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
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

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

  const handleEdit = (noteId: string) => {
    const note = notes.find(n => n._id === noteId);
    if (note) setEditingNote(note);
    setShowForm(true);
  };

  const handleDelete = async (noteId: string) => {
    await api.delete(`/notes/${noteId}`);
    fetchNotes();
  };

  return (
    <div className="dashboard">
      <Navbar />
      <button onClick={() => { setEditingNote(null); setShowForm(true); }}>Criar Nota</button>
      {showForm && (
        <NoteForm
          noteId={editingNote?._id}
          initialTitle={editingNote?.title}
          initialContent={editingNote?.content}
          initialColor={editingNote?.color}
          onClose={() => setShowForm(false)}
          onSave={fetchNotes}
        />
      )}
      <div className="notes-grid">
        {notes.map(note => (
          <NoteCard
            key={note._id}
            {...note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

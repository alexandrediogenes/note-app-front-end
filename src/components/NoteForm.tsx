import React, { useState, useEffect } from 'react';
import api from '../api/api';

interface NoteFormProps {
  noteId?: string;
  initialTitle?: string;
  initialContent?: string;
  initialColor?: string;
  onClose: () => void;
  onSave: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ noteId, initialTitle = '', initialContent = '', initialColor = '#ffffff', onClose, onSave }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [color, setColor] = useState(initialColor);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (noteId) {
        await api.put(`/notes/${noteId}`, { title, content, color });
      } else {
        await api.post('/notes', { title, content, color });
      }
      onSave();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Conteúdo" required />
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        <button type="submit">{noteId ? 'Atualizar' : 'Criar'}</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default NoteForm;

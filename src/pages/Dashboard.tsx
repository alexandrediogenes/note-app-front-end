import { useEffect, useState } from 'react';
import api from '../services/api';

interface Note {
  _id: string;
  title: string;
  content: string;
}

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Erro ao buscar notas');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []); // ⚠️ NÃO coloque notes aqui

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      {notes.length === 0 ? (
        <p>Nenhuma nota encontrada</p>
      ) : (
        notes.map(note => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;

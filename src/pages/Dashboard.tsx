import { useEffect, useState } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Erro ao buscar notas', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {notes.length === 0 ? (
        <p>Nenhuma nota encontrada</p>
      ) : (
        notes.map((note: any) => (
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

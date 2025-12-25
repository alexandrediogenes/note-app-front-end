import React from 'react';

interface NoteCardProps {
  _id: string;
  title: string;
  content: string;
  color: string;
  isPinned: boolean;
  onEdit: (_id: string) => void;
  onDelete: (_id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ _id, title, content, color, isPinned, onEdit, onDelete }) => {
  return (
    <div className="note" style={{ backgroundColor: color }}>
      <h3>{title} {isPinned && '📌'}</h3>
      <p>{content}</p>
      <div>
        <button onClick={() => onEdit(_id)}>Editar</button>
        <button onClick={() => onDelete(_id)}>Deletar</button>
      </div>
    </div>
  );
};

export default NoteCard;

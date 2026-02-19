import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GripVertical, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface SubjectRankingProps {
  subjects: string[];
  onReorder: (subjects: string[]) => void;
}

interface DraggableSubjectProps {
  subject: string;
  index: number;
  moveSubject: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableSubject({ subject, index, moveSubject }: DraggableSubjectProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'subject',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'subject',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveSubject(item.index, index);
        item.index = index;
      }
    },
  });

  const priorityColors = [
    'from-red-500 to-orange-500',
    'from-orange-500 to-yellow-500',
    'from-yellow-500 to-green-500',
    'from-green-500 to-blue-500',
    'from-blue-500 to-indigo-500',
    'from-indigo-500 to-purple-500',
    'from-purple-500 to-pink-500',
    'from-pink-500 to-rose-500'
  ];

  const priorityLabels = [
    '🔥 Prioridade Máxima',
    '⭐ Muito Importante',
    '✨ Importante',
    '📚 Relevante',
    '📖 Necessário',
    '📝 Complementar',
    '📊 Adicional',
    '📌 Secundário'
  ];

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <motion.div
        layout
        className={`p-4 mb-2 rounded-lg bg-gradient-to-r ${priorityColors[index % priorityColors.length]} text-white cursor-move shadow-md hover:shadow-lg transition-shadow`}
      >
        <div className="flex items-center gap-3">
          <GripVertical className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold">#{index + 1}</span>
              <span className="font-medium">{subject}</span>
            </div>
            <p className="text-xs mt-1 opacity-90">{priorityLabels[index % priorityLabels.length]}</p>
          </div>
          {index === 0 && <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />}
        </div>
      </motion.div>
    </div>
  );
}

export function SubjectRanking({ subjects, onReorder }: SubjectRankingProps) {
  const moveSubject = (dragIndex: number, hoverIndex: number) => {
    const draggedSubject = subjects[dragIndex];
    const newSubjects = [...subjects];
    newSubjects.splice(dragIndex, 1);
    newSubjects.splice(hoverIndex, 0, draggedSubject);
    onReorder(newSubjects);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <GripVertical className="w-4 h-4" />
          <p>Arraste para reorganizar por ordem de prioridade (do mais importante ao menos)</p>
        </div>
        {subjects.map((subject, index) => (
          <DraggableSubject
            key={subject}
            subject={subject}
            index={index}
            moveSubject={moveSubject}
          />
        ))}
      </div>
    </DndProvider>
  );
}

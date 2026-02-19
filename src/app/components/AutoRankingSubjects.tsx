import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Circle, TrendingUp, AlertCircle } from 'lucide-react';
import { subjectPriorities, autoRankSubjects, getPriorityLabel } from '../utils/subjectPriority';

interface AutoRankingSubjectsProps {
  selectedSubjects: string[];
  onSubjectsChange: (subjects: string[]) => void;
}

export function AutoRankingSubjects({ selectedSubjects, onSubjectsChange }: AutoRankingSubjectsProps) {
  const [rankedSubjects, setRankedSubjects] = useState<string[]>([]);

  // Atualizar ranking automaticamente quando disciplinas mudam
  useEffect(() => {
    if (selectedSubjects.length > 0) {
      const ranked = autoRankSubjects(selectedSubjects);
      setRankedSubjects(ranked);
    } else {
      setRankedSubjects([]);
    }
  }, [selectedSubjects]);

  const availableSubjects = Object.keys(subjectPriorities).sort();

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      onSubjectsChange(selectedSubjects.filter(s => s !== subject));
    } else {
      onSubjectsChange([...selectedSubjects, subject]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Seleção de Disciplinas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <span>📚 Selecione suas Disciplinas</span>
          <span className="text-xs text-gray-500 font-normal">
            (A IA vai priorizar automaticamente)
          </span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {availableSubjects.map((subject) => {
            const isSelected = selectedSubjects.includes(subject);
            const priority = subjectPriorities[subject];
            const { color, emoji } = getPriorityLabel(priority.weight);

            return (
              <motion.button
                key={subject}
                type="button"
                onClick={() => toggleSubject(subject)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{priority.icon}</span>
                  {isSelected ? (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div className="font-medium text-sm text-gray-900">{subject}</div>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 text-xs text-gray-600 flex items-center gap-1"
                  >
                    <span>{emoji}</span>
                    <span className="truncate">Prioridade detectada</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Ranking Automático */}
      <AnimatePresence>
        {rankedSubjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-lg text-gray-900">
                Ranking Inteligente de Prioridades
              </h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
              <span>
                A IA organizou suas disciplinas por ordem de importância acadêmica. 
                Foque mais tempo nas primeiras!
              </span>
            </p>

            <div className="space-y-3">
              {rankedSubjects.map((subject, index) => {
                const priority = subjectPriorities[subject];
                const { label, color, emoji } = getPriorityLabel(priority.weight);
                const percentage = Math.round((priority.weight / 10) * 100);

                return (
                  <motion.div
                    key={subject}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{priority.icon}</span>
                            <span className="font-bold text-gray-900">{subject}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {priority.description}
                          </p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${color} text-white whitespace-nowrap`}>
                        {emoji} {label}
                      </div>
                    </div>

                    {/* Barra de Importância */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Nível de Importância</span>
                        <span className="font-bold text-gray-900">{percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Tempo de Estudo Sugerido */}
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className="text-gray-600">Tempo sugerido:</span>
                      <span className="font-bold text-blue-600">
                        {priority.weight >= 9 ? '4-5h/semana' :
                         priority.weight >= 7 ? '3-4h/semana' :
                         priority.weight >= 5 ? '2-3h/semana' : '1-2h/semana'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Resumo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: rankedSubjects.length * 0.1 + 0.3 }}
              className="mt-4 p-4 bg-blue-100 rounded-xl border border-blue-300"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-bold text-blue-900 mb-1">💡 Dica Inteligente</p>
                  <p className="text-blue-800">
                    As disciplinas no topo são fundamentais para seu sucesso acadêmico. 
                    Dedique mais tempo e energia nelas, mas não negligencie as outras!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sistema de priorização inteligente de disciplinas
// Baseado em complexidade, importância acadêmica e impacto no futuro

export interface SubjectPriority {
  name: string;
  weight: number; // 1-10 (10 = mais crítico)
  difficulty: number; // 1-10
  importance: number; // 1-10
  description: string;
  icon: string;
}

export const subjectPriorities: Record<string, SubjectPriority> = {
  'Matemática': {
    name: 'Matemática',
    weight: 10,
    difficulty: 9,
    importance: 10,
    description: 'Base para todas as ciências exatas e raciocínio lógico',
    icon: '🧮'
  },
  'Física': {
    name: 'Física',
    weight: 9,
    difficulty: 9,
    importance: 9,
    description: 'Fundamental para engenharias e ciências naturais',
    icon: '⚛️'
  },
  'Química': {
    name: 'Química',
    weight: 9,
    difficulty: 8,
    importance: 9,
    description: 'Essencial para saúde, farmácia e indústrias',
    icon: '🧪'
  },
  'Português': {
    name: 'Português',
    weight: 8,
    difficulty: 7,
    importance: 10,
    description: 'Comunicação essencial em todas as áreas',
    icon: '📖'
  },
  'Inglês': {
    name: 'Inglês',
    weight: 8,
    difficulty: 7,
    importance: 9,
    description: 'Idioma universal para oportunidades globais',
    icon: '🌍'
  },
  'Biologia': {
    name: 'Biologia',
    weight: 8,
    difficulty: 7,
    importance: 8,
    description: 'Crucial para saúde e ciências da vida',
    icon: '🧬'
  },
  'Informática': {
    name: 'Informática',
    weight: 8,
    difficulty: 6,
    importance: 9,
    description: 'Competência digital indispensável no século XXI',
    icon: '💻'
  },
  'História': {
    name: 'História',
    weight: 6,
    difficulty: 6,
    importance: 7,
    description: 'Compreensão crítica da sociedade e contextos',
    icon: '📜'
  },
  'Geografia': {
    name: 'Geografia',
    weight: 6,
    difficulty: 6,
    importance: 7,
    description: 'Visão espacial e ambiental do mundo',
    icon: '🗺️'
  },
  'Filosofia': {
    name: 'Filosofia',
    weight: 5,
    difficulty: 7,
    importance: 6,
    description: 'Pensamento crítico e raciocínio abstrato',
    icon: '🤔'
  },
  'Sociologia': {
    name: 'Sociologia',
    weight: 5,
    difficulty: 6,
    importance: 6,
    description: 'Compreensão das dinâmicas sociais',
    icon: '👥'
  },
  'Desenho': {
    name: 'Desenho',
    weight: 5,
    difficulty: 5,
    importance: 6,
    description: 'Criatividade e expressão visual',
    icon: '🎨'
  },
  'Educação Física': {
    name: 'Educação Física',
    weight: 4,
    difficulty: 4,
    importance: 5,
    description: 'Saúde e bem-estar físico',
    icon: '⚽'
  },
  'Música': {
    name: 'Música',
    weight: 4,
    difficulty: 5,
    importance: 5,
    description: 'Expressão artística e coordenação',
    icon: '🎵'
  }
};

// Função para ranquear automaticamente disciplinas
export function autoRankSubjects(selectedSubjects: string[]): string[] {
  return selectedSubjects.sort((a, b) => {
    const priorityA = subjectPriorities[a]?.weight || 0;
    const priorityB = subjectPriorities[b]?.weight || 0;
    return priorityB - priorityA; // Ordem decrescente (maior prioridade primeiro)
  });
}

// Função para obter label de prioridade baseado no peso
export function getPriorityLabel(weight: number): {
  label: string;
  color: string;
  emoji: string;
} {
  if (weight >= 9) return { label: 'Crítica', color: 'bg-red-500', emoji: '🔥' };
  if (weight >= 8) return { label: 'Muito Alta', color: 'bg-orange-500', emoji: '⚠️' };
  if (weight >= 7) return { label: 'Alta', color: 'bg-yellow-500', emoji: '⭐' };
  if (weight >= 6) return { label: 'Média-Alta', color: 'bg-blue-500', emoji: '📌' };
  if (weight >= 5) return { label: 'Média', color: 'bg-green-500', emoji: '✓' };
  return { label: 'Complementar', color: 'bg-gray-500', emoji: '○' };
}

// Obter análise de prioridade para uma disciplina
export function getSubjectAnalysis(subject: string): string {
  const priority = subjectPriorities[subject];
  if (!priority) return '';
  
  const { label } = getPriorityLabel(priority.weight);
  return `${priority.icon} Prioridade ${label}: ${priority.description}`;
}

// Calcular distribuição inteligente de tempo de estudo
export function calculateStudyDistribution(rankedSubjects: string[]): Map<string, number> {
  const distribution = new Map<string, number>();
  const totalWeight = rankedSubjects.reduce((sum, subject) => {
    return sum + (subjectPriorities[subject]?.weight || 1);
  }, 0);
  
  rankedSubjects.forEach(subject => {
    const weight = subjectPriorities[subject]?.weight || 1;
    const percentage = (weight / totalWeight) * 100;
    distribution.set(subject, Math.round(percentage));
  });
  
  return distribution;
}

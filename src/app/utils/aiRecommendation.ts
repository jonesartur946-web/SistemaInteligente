// Simulação de processamento de IA para recomendações de estudo
// Em produção, isso seria substituído por uma chamada real a uma API de IA

interface FormData {
  gradeLevel: string;
  subjects: string[];  // Agora ordenado por prioridade
  studyTime: string;
  learningStyle: string;
  hobbies: string;
}

interface Recommendation {
  studyPlan: string[];
  techniques: string[];
  resources: string[];
  schedule: string[];
  tips: string[];
  motivation: string;
}

const gradeLevelMap: Record<string, string> = {
  fundamental1: 'Ensino Fundamental I',
  fundamental2: 'Ensino Fundamental II',
  medio: 'Ensino Médio',
  'pre-vestibular': 'Pré-Vestibular',
  superior: 'Ensino Superior'
};

const studyTimeMap: Record<string, number> = {
  '30min': 30,
  '1h': 60,
  '2h': 120,
  '3h': 180,
  '4h+': 240
};

const learningStyleMap: Record<string, string> = {
  visual: 'Visual',
  auditivo: 'Auditivo',
  leitura: 'Leitura/Escrita',
  pratico: 'Prático',
  misto: 'Misto'
};

export async function generateRecommendation(formData: FormData): Promise<Recommendation> {
  // Simular delay de processamento de IA
  await new Promise(resolve => setTimeout(resolve, 2000));

  const studyMinutes = studyTimeMap[formData.studyTime] || 60;
  const gradeLevel = gradeLevelMap[formData.gradeLevel];
  const learningStyle = learningStyleMap[formData.learningStyle];
  const subjects = formData.subjects.join(', ');

  // Gerar plano de estudos baseado nos dados do formulário
  const studyPlan: string[] = [];
  
  // Usar ranking de prioridade das disciplinas
  if (formData.subjects.length === 1) {
    studyPlan.push(`Foque 100% do seu tempo em ${formData.subjects[0]} com sessões de ${studyMinutes} minutos diários`);
  } else if (formData.subjects.length === 2) {
    studyPlan.push(`Distribua seu tempo priorizando ${formData.subjects[0]} (60%) e ${formData.subjects[1]} (40%)`);
  } else if (formData.subjects.length === 3) {
    studyPlan.push(`Priorize ${formData.subjects[0]} (50% do tempo), seguido de ${formData.subjects[1]} (30%) e ${formData.subjects[2]} (20%)`);
  } else {
    const topPriority = formData.subjects.slice(0, 2).join(' e ');
    studyPlan.push(`Com base no seu ranking, foque 60% do tempo em ${topPriority} (suas prioridades máximas)`);
    studyPlan.push(`Distribua 30% entre ${formData.subjects.slice(2, 4).join(' e ')} e 10% nas demais disciplinas`);
  }

  studyPlan.push(`Dedique os primeiros 15 minutos para revisar o conteúdo da sessão anterior`);
  
  // Análise inteligente de hobbies para personalizar o plano
  if (formData.hobbies) {
    const hobbiesLower = formData.hobbies.toLowerCase();
    if (hobbiesLower.includes('música') || hobbiesLower.includes('violão') || hobbiesLower.includes('tocar')) {
      studyPlan.push(`💡 Insight: Use sua paixão por música! Estude com música ambiente ou crie músicas sobre conceitos difíceis`);
    }
    if (hobbiesLower.includes('desenhar') || hobbiesLower.includes('arte') || hobbiesLower.includes('pintar')) {
      studyPlan.push(`🎨 Insight: Aproveite seu talento artístico criando ilustrações e diagramas visuais dos conceitos`);
    }
    if (hobbiesLower.includes('esporte') || hobbiesLower.includes('futebol') || hobbiesLower.includes('academia')) {
      studyPlan.push(`⚽ Insight: Combine estudo com atividade física! Faça pausas ativas e use movimento para memorizar`);
    }
    if (hobbiesLower.includes('game') || hobbiesLower.includes('jogos') || hobbiesLower.includes('videogame')) {
      studyPlan.push(`🎮 Insight: Gamifique seus estudos! Crie desafios, níveis e recompensas para cada meta alcançada`);
    }
  }

  studyPlan.push(`Reserve ${Math.min(30, Math.floor(studyMinutes * 0.3))} minutos para exercícios práticos`);
  
  if (studyMinutes >= 90) {
    studyPlan.push(`Faça pausas de 10 minutos a cada 50 minutos de estudo (Técnica Pomodoro)`);
  }

  // Técnicas baseadas no estilo de aprendizagem
  const techniques: string[] = [];
  
  if (formData.learningStyle === 'visual' || formData.learningStyle === 'misto') {
    techniques.push('🎨 Mapas mentais: Crie diagramas visuais coloridos conectando conceitos');
    techniques.push('📊 Infográficos: Transforme informações complexas em gráficos visuais');
    techniques.push('🌈 Flashcards coloridos: Use cores diferentes para cada categoria');
  }
  
  if (formData.learningStyle === 'auditivo' || formData.learningStyle === 'misto') {
    techniques.push('🎙️ Grave resumos em áudio: Ouça durante caminhadas ou no transporte');
    techniques.push('🗣️ Explique em voz alta: Ensine o conteúdo para alguém ou grave videoaulas');
    techniques.push('🎧 Podcasts educativos: Complemente estudos com conteúdos em áudio');
  }
  
  if (formData.learningStyle === 'leitura' || formData.learningStyle === 'misto') {
    techniques.push('📝 Resumos estruturados: Organize em tópicos, subtópicos e palavras-chave');
    techniques.push('📖 Técnica Cornell: Divida notas em seções de conceitos, exemplos e resumo');
    techniques.push('✍️ Reescrita ativa: Reescreva conceitos com suas próprias palavras');
  }
  
  if (formData.learningStyle === 'pratico' || formData.learningStyle === 'misto') {
    techniques.push('🔬 Resolução massiva de exercícios: Pratique até dominar');
    techniques.push('🎯 Aplicação real: Conecte teoria com exemplos do seu dia a dia');
    techniques.push('🧪 Experimentos: Quando possível, faça testes práticos dos conceitos');
  }

  techniques.push('🔄 Revisão espaçada: Revise após 1 dia, 1 semana, 1 mês (método comprovado cientificamente)');
  techniques.push('🧠 Active Recall: Teste a si mesmo sem olhar o material - força a memória');

  // Recursos recomendados
  const resources: string[] = [];
  
  if (formData.subjects.includes('Matemática')) {
    resources.push('📐 Khan Academy - Videoaulas gratuitas de matemática em todos os níveis');
    resources.push('📱 Photomath - App que resolve e explica problemas matemáticos');
  }
  if (formData.subjects.includes('Física') || formData.subjects.includes('Química')) {
    resources.push('🔬 YouTube: Professor Ferretto, Química em Ação, Física Total');
    resources.push('📚 PhET Interactive Simulations - Simulações interativas de física e química');
  }
  if (formData.subjects.includes('Inglês')) {
    resources.push('🗣️ Duolingo - App gamificado para aprender inglês');
    resources.push('📺 BBC Learning English - Conteúdo autêntico e gratuito');
    resources.push('🎬 Filmes e séries com legendas em inglês');
  }
  if (formData.subjects.includes('Português')) {
    resources.push('✍️ Descomplica e Brasil Escola - Gramática e redação');
    resources.push('📖 Leitura de livros e jornais para melhorar escrita');
  }
  if (formData.subjects.includes('História') || formData.subjects.includes('Geografia')) {
    resources.push('🌍 Documentários históricos e geográficos na Netflix/YouTube');
    resources.push('📱 Google Earth para visualizar geografia');
  }
  if (formData.subjects.includes('Biologia')) {
    resources.push('🧬 YouTube: Biologia Total, Professor Jubilut');
    resources.push('🔬 Aplicativos de anatomia 3D');
  }
  
  resources.push('🎴 Anki - Flashcards com repetição espaçada (método cientificamente comprovado)');
  resources.push('📚 Google Scholar - Pesquisas acadêmicas de alta qualidade');
  resources.push('📖 Biblioteca escolar ou municipal - Materiais complementares gratuitos');
  resources.push('👥 Grupos de estudo online - Telegram, Discord, WhatsApp');

  // Cronograma inteligente baseado em prioridades
  const schedule: string[] = [];
  
  if (studyMinutes >= 120) {
    schedule.push(`Segunda, Quarta, Sexta: Foco total em ${formData.subjects[0]} (sua prioridade máxima)`);
    if (formData.subjects[1]) {
      schedule.push(`Terça, Quinta: Dedique-se a ${formData.subjects[1]} (segunda prioridade)`);
    }
    schedule.push(`Sábado: Revise ${formData.subjects.slice(0, 3).join(', ')} e faça exercícios variados`);
    schedule.push(`Domingo: Revisão leve das disciplinas de menor prioridade e planejamento da semana`);
  } else if (studyMinutes >= 60) {
    schedule.push(`Dias alternados: ${formData.subjects[0]} (50% dos dias) e outras disciplinas (50%)`);
    schedule.push(`Fim de semana: Revisão semanal seguindo a ordem de prioridade`);
  } else {
    schedule.push(`Foque nas 2 disciplinas prioritárias: ${formData.subjects.slice(0, 2).join(' e ')}`);
    schedule.push(`Fim de semana: 10-15 minutos de revisão rápida de todas`);
  }

  // Dicas personalizadas
  const tips: string[] = [
    '🎯 Ambiente otimizado: Estude sempre no mesmo local, bem iluminado e organizado',
    '⏰ Ritual de início: Crie um ritual antes de estudar (música específica, alongamento)',
    '🏆 Celebre conquistas: Recompense-se ao completar metas de estudo',
    '😴 Sono é aprendizado: Durma 7-8h - o cérebro consolida memória durante o sono',
    '💧 Hidratação cerebral: Beba água e faça lanches saudáveis (nozes, frutas)',
    '📵 Modo avião: Desligue notificações durante blocos de estudo focado',
    '🔄 Variedade é chave: Alterne entre disciplinas para evitar fadiga mental',
    '📊 Acompanhe progresso: Use um diário de estudos ou app de tracking'
  ];

  // Análise de hobbies para dicas personalizadas
  if (formData.hobbies) {
    const hobbiesLower = formData.hobbies.toLowerCase();
    if (hobbiesLower.includes('ler') || hobbiesLower.includes('livro')) {
      tips.push('📚 Seu amor por leitura é um superpoder! Use para aprofundar em todas as matérias');
    }
    if (hobbiesLower.includes('programar') || hobbiesLower.includes('código')) {
      tips.push('💻 Aplique lógica de programação para resolver problemas de matemática e física!');
    }
  }

  // Mensagem motivacional personalizada
  let motivation = `Parabéns por dar este passo rumo à excelência acadêmica! `;
  
  if (formData.gradeLevel === 'pre-vestibular') {
    motivation += `Você está na reta final para o vestibular - cada dia de estudo focado te aproxima da aprovação. `;
  } else if (formData.gradeLevel === 'superior') {
    motivation += `O ensino superior exige estratégia, e você está agindo com inteligência ao buscar um plano estruturado. `;
  } else if (formData.gradeLevel === 'medio') {
    motivation += `O Ensino Médio é a base para seu futuro - está construindo alicerces sólidos agora. `;
  }
  
  motivation += `Este plano foi gerado por IA considerando seu ranking de prioridades em ${subjects}, `;
  motivation += `seu tempo disponível (${studyMinutes} minutos/dia) e seu estilo de aprendizagem ${learningStyle.toLowerCase()}. `;
  
  if (formData.hobbies) {
    motivation += `Seus hobbies (${formData.hobbies}) também foram analisados para personalizar suas técnicas. `;
  }
  
  motivation += `Lembre-se: consistência supera intensidade. Estudar ${studyMinutes} minutos TODO DIA é infinitamente melhor que maratonas irregulares. `;
  motivation += `Você tem tudo para alcançar seus objetivos. Disciplina + Método Inteligente = Sucesso Garantido! 🚀`;

  return {
    studyPlan,
    techniques,
    resources,
    schedule,
    tips,
    motivation
  };
}

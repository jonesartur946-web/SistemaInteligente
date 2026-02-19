import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { BookOpen, Sparkles, Clock, User, Heart, Trophy } from 'lucide-react';
import { AutoRankingSubjects } from './AutoRankingSubjects';
import { StickyFeedback, Feedback } from './StickyFeedback';
import { SuccessParticles, PulseEffect } from './AnimationEffects';
import { motion } from 'motion/react';

interface FormData {
  userName: string;
  gradeLevel: string;
  subjects: string[];
  studyTime: string;
  learningStyle: string;
  hobbies: string;
}

interface RecommendationFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    gradeLevel: '',
    subjects: [],
    studyTime: '',
    learningStyle: '',
    hobbies: ''
  });

  const [feedbacks, setFeedbacks] = useState<Array<{ id: number; message: string; type: 'analyzing' | 'insight' | 'success' | 'processing' }>>([]);
  const [processingScore, setProcessingScore] = useState(0);

  // Processamento em tempo real
  useEffect(() => {
    let score = 0;
    const newFeedbacks: typeof feedbacks = [];

    if (formData.userName) {
      score += 15;
      newFeedbacks.push({
        id: Date.now() + 1,
        message: `Olá ${formData.userName.split(' ')[0]}! Identificando seu perfil...`,
        type: 'analyzing'
      });
    }

    if (formData.gradeLevel) {
      score += 20;
      const levelInsights: Record<string, string> = {
        'fundamental1': 'Ótimo! Fase perfeita para desenvolver bases sólidas de aprendizado.',
        'fundamental2': 'Excelente! Momento ideal para explorar suas áreas de interesse.',
        'medio': 'Fantástico! Período crucial para preparação acadêmica.',
        'pre-vestibular': 'Atenção total! Fase decisiva para o futuro universitário.',
        'superior': 'Parabéns! Aprofundando conhecimentos especializados.'
      };
      newFeedbacks.push({
        id: Date.now() + 2,
        message: levelInsights[formData.gradeLevel] || 'Analisando seu nível acadêmico...',
        type: 'insight'
      });
    }

    if (formData.subjects.length > 0) {
      score += 25;
      newFeedbacks.push({
        id: Date.now() + 3,
        message: `Detectadas ${formData.subjects.length} áreas de interesse. Processando compatibilidades...`,
        type: 'processing'
      });
    }

    if (formData.subjects.length >= 3) {
      newFeedbacks.push({
        id: Date.now() + 4,
        message: 'Perfil multidisciplinar identificado! Isso é excelente para seu desenvolvimento.',
        type: 'success'
      });
    }

    if (formData.studyTime) {
      score += 15;
      const timeInsights: Record<string, string> = {
        '30min': 'Tempo otimizado! Vou sugerir estudos concentrados e eficientes.',
        '1h': 'Boa disponibilidade! Suficiente para progressos consistentes.',
        '2h': 'Excelente dedicação! Tempo ideal para aprendizado profundo.',
        '3h': 'Comprometimento admirável! Grande potencial de evolução.',
        '4h+': 'Dedicação excepcional! Preparando recomendações avançadas.'
      };
      newFeedbacks.push({
        id: Date.now() + 5,
        message: timeInsights[formData.studyTime] || 'Analisando disponibilidade de tempo...',
        type: 'insight'
      });
    }

    if (formData.learningStyle) {
      score += 15;
      const styleInsights: Record<string, string> = {
        'visual': 'Estilo visual detectado! Recursos gráficos serão priorizados.',
        'auditivo': 'Aprendiz auditivo! Conteúdos em áudio e podcasts recomendados.',
        'leitura': 'Perfil de leitura! Livros e textos serão enfatizados.',
        'pratico': 'Mão na massa! Exercícios práticos em alta prioridade.',
        'misto': 'Aprendiz versátil! Métodos variados para melhor resultado.'
      };
      newFeedbacks.push({
        id: Date.now() + 6,
        message: styleInsights[formData.learningStyle] || 'Identificando estilo de aprendizagem...',
        type: 'processing'
      });
    }

    if (formData.hobbies && formData.hobbies.length > 10) {
      score += 10;
      newFeedbacks.push({
        id: Date.now() + 7,
        message: 'Hobbies analisados! Identificando conexões com carreiras potenciais.',
        type: 'insight'
      });
    }

    setProcessingScore(score);
    
    // Atualizar feedbacks apenas se houver mudanças significativas
    if (newFeedbacks.length > 0 && JSON.stringify(newFeedbacks) !== JSON.stringify(feedbacks)) {
      setFeedbacks(newFeedbacks);
    }
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleSubjectsReorder = (reorderedSubjects: string[]) => {
    setFormData(prev => ({ ...prev, subjects: reorderedSubjects }));
  };

  const subjects = [
    'Matemática',
    'Português',
    'Física',
    'Química',
    'Biologia',
    'História',
    'Geografia',
    'Inglês'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sticky Feedback - Fica fixo no canto */}
      <StickyFeedback feedbacks={feedbacks} processingScore={processingScore} />

      {/* Nome do Usuário */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-2"
      >
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <User className="w-4 h-4" />
          Seu Nome
        </Label>
        <Input
          type="text"
          placeholder="Digite seu nome completo"
          value={formData.userName}
          onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
          className="border-[#3b82f6] transition-all focus:scale-[1.02]"
          required
        />
      </motion.div>

      {/* Nível de Ensino */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <BookOpen className="w-4 h-4" />
          Nível de Ensino
        </Label>
        <Select value={formData.gradeLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, gradeLevel: value }))}>
          <SelectTrigger className="border-[#3b82f6]">
            <SelectValue placeholder="Selecione seu nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fundamental1">Ensino Fundamental I (1º ao 5º ano)</SelectItem>
            <SelectItem value="fundamental2">Ensino Fundamental II (6º ao 9º ano)</SelectItem>
            <SelectItem value="medio">Ensino Médio</SelectItem>
            <SelectItem value="pre-vestibular">Pré-Vestibular</SelectItem>
            <SelectItem value="superior">Ensino Superior</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Matérias de Interesse */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Trophy className="w-4 h-4" />
          Matérias de Interesse
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {subjects.map((subject) => (
            <motion.button
              key={subject}
              type="button"
              onClick={() => handleSubjectToggle(subject)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg border-2 transition-all ${
                formData.subjects.includes(subject)
                  ? 'bg-[#3b82f6] text-white border-[#3b82f6] shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#3b82f6]'
              }`}
            >
              {subject}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Sistema de Ranking Automático de Disciplinas */}
      {formData.subjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <AutoRankingSubjects
            selectedSubjects={formData.subjects}
            onSubjectsChange={(subjects) => setFormData(prev => ({ ...prev, subjects }))}
          />
        </motion.div>
      )}

      {/* Tempo Disponível */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Clock className="w-4 h-4" />
          Tempo Disponível por Dia
        </Label>
        <Select value={formData.studyTime} onValueChange={(value) => setFormData(prev => ({ ...prev, studyTime: value }))}>
          <SelectTrigger className="border-[#3b82f6]">
            <SelectValue placeholder="Quanto tempo você pode estudar?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30min">30 minutos</SelectItem>
            <SelectItem value="1h">1 hora</SelectItem>
            <SelectItem value="2h">2 horas</SelectItem>
            <SelectItem value="3h">3 horas</SelectItem>
            <SelectItem value="4h+">4 horas ou mais</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Estilo de Aprendizagem */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Sparkles className="w-4 h-4" />
          Como você aprende melhor?
        </Label>
        <Select value={formData.learningStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, learningStyle: value }))}>
          <SelectTrigger className="border-[#3b82f6]">
            <SelectValue placeholder="Escolha seu estilo de aprendizagem" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="visual">Visual (vídeos, diagramas, imagens)</SelectItem>
            <SelectItem value="auditivo">Auditivo (áudios, explicações faladas)</SelectItem>
            <SelectItem value="leitura">Leitura/Escrita (livros, resumos, textos)</SelectItem>
            <SelectItem value="pratico">Prático (exercícios, experimentos)</SelectItem>
            <SelectItem value="misto">Misto (combinação de vários)</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Hobbies */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-2"
      >
        <Label htmlFor="hobbies" className="flex items-center gap-2 text-[#1e3a8a]">
          <Heart className="w-4 h-4" />
          Seus Hobbies e Atividades Favoritas
        </Label>
        <Input
          id="hobbies"
          placeholder="Ex: Jogar futebol, desenhar, programar, tocar violão, ler livros..."
          value={formData.hobbies}
          onChange={(e) => setFormData(prev => ({ ...prev, hobbies: e.target.value }))}
          className="border-[#3b82f6]"
        />
        <p className="text-xs text-gray-500">
          Seus hobbies podem revelar talentos e interesses que conectam com carreiras incríveis!
        </p>
      </motion.div>

      <Button
        type="submit"
        disabled={isLoading || !formData.gradeLevel || formData.subjects.length === 0}
        className="w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processando com IA...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Gerar Recomendações Personalizadas
          </span>
        )}
      </Button>
    </form>
  );
}
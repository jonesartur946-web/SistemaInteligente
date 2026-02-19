import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { User, Briefcase, Target, DollarSign, Heart, Sparkles, TrendingUp, Brain, Users, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';
import { StickyFeedback } from './StickyFeedback';

export interface CareerFormData {
  userName: string;
  currentLevel: string;
  interests: string[];
  skills: string[];
  workStyle: string;
  salary: string;
  personalityType: string;
  dreamCareer: string;
  strengths: string;
  hobbies: string;
}

interface CareerFormProps {
  onSubmit: (data: CareerFormData) => void;
  isLoading: boolean;
}

export function CareerForm({ onSubmit, isLoading }: CareerFormProps) {
  const [formData, setFormData] = useState<CareerFormData>({
    userName: '',
    currentLevel: '',
    interests: [],
    skills: [],
    workStyle: '',
    salary: '',
    personalityType: '',
    dreamCareer: '',
    strengths: '',
    hobbies: ''
  });

  const [feedbacks, setFeedbacks] = useState<Array<{ id: number; message: string; type: 'analyzing' | 'insight' | 'success' | 'processing' }>>([]);
  const [processingScore, setProcessingScore] = useState(0);

  // Processamento inteligente em tempo real
  useEffect(() => {
    let score = 0;
    const newFeedbacks: typeof feedbacks = [];

    if (formData.userName) {
      score += 12;
      newFeedbacks.push({
        id: Date.now() + 1,
        message: `${formData.userName.split(' ')[0]}, iniciando análise profissional...`,
        type: 'analyzing'
      });
    }

    if (formData.currentLevel) {
      score += 15;
      const levelInsights: Record<string, string> = {
        'fundamental': 'Momento perfeito para explorar possibilidades de carreira!',
        'medio': 'Fase ideal para começar a planejar seu futuro profissional.',
        'medio-completo': 'Preparado para escolher sua trajetória universitária!',
        'superior': 'Aprofundando conhecimentos para o mercado de trabalho.',
        'superior-completo': 'Pronto para alçar voos mais altos na carreira!',
        'pos': 'Especialização avançada - mercado de alto nível te aguarda!'
      };
      newFeedbacks.push({
        id: Date.now() + 2,
        message: levelInsights[formData.currentLevel] || 'Analisando nível acadêmico...',
        type: 'insight'
      });
    }

    if (formData.interests.length > 0) {
      score += 18;
      newFeedbacks.push({
        id: Date.now() + 3,
        message: `${formData.interests.length} áreas de interesse mapeadas. Cruzando com banco de carreiras...`,
        type: 'processing'
      });
    }

    if (formData.interests.length >= 3) {
      newFeedbacks.push({
        id: Date.now() + 4,
        message: 'Perfil versátil detectado! Múltiplas possibilidades de carreira identificadas.',
        type: 'success'
      });
    }

    if (formData.skills.length > 0) {
      score += 15;
      newFeedbacks.push({
        id: Date.now() + 5,
        message: `${formData.skills.length} habilidades-chave reconhecidas. Calculando compatibilidades...`,
        type: 'processing'
      });
    }

    if (formData.workStyle) {
      score += 12;
      const styleInsights: Record<string, string> = {
        'equipe': 'Colaborador nato! Carreiras em equipe serão priorizadas.',
        'independente': 'Autonomia é seu forte! Focando em carreiras independentes.',
        'lideranca': 'Líder natural! Cargos de gestão destacados nas recomendações.',
        'hibrido': 'Flexível e adaptável! Ampla gama de oportunidades.'
      };
      newFeedbacks.push({
        id: Date.now() + 6,
        message: styleInsights[formData.workStyle] || 'Identificando estilo de trabalho...',
        type: 'insight'
      });
    }

    if (formData.personalityType) {
      score += 13;
      const personalityInsights: Record<string, string> = {
        'analitico': 'Mente analítica! Carreiras em dados e estratégia em destaque.',
        'criativo': 'Criatividade brilhante! Design e inovação serão enfatizados.',
        'pratico': 'Orientado a resultados! Foco em carreiras práticas e objetivas.',
        'social': 'Habilidades interpessoais excepcionais! Carreiras com pessoas.',
        'empreendedor': 'Espírito empreendedor! Negócios e startups no radar.'
      };
      newFeedbacks.push({
        id: Date.now() + 7,
        message: personalityInsights[formData.personalityType] || 'Mapeando personalidade profissional...',
        type: 'processing'
      });
    }

    if (formData.hobbies && formData.hobbies.length > 15) {
      score += 10;
      newFeedbacks.push({
        id: Date.now() + 8,
        message: 'Hobbies analisados! Descobrindo conexões únicas com carreiras.',
        type: 'insight'
      });
    }

    if (formData.dreamCareer) {
      score += 5;
      newFeedbacks.push({
        id: Date.now() + 9,
        message: `Carreira dos sonhos registrada: ${formData.dreamCareer}. Buscando caminhos...`,
        type: 'success'
      });
    }

    setProcessingScore(score);
    
    if (newFeedbacks.length > 0 && JSON.stringify(newFeedbacks) !== JSON.stringify(feedbacks)) {
      setFeedbacks(newFeedbacks);
    }
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const interests = [
    'Tecnologia',
    'Redes e Infraestrutura',
    'Cibersegurança',
    'Saúde',
    'Educação',
    'Arte e Design',
    'Negócios',
    'Ciências',
    'Comunicação',
    'Engenharia',
    'Direito',
    'Ambiente',
    'Esportes',
    'Culinária'
  ];

  const skills = [
    'Criatividade',
    'Lógica',
    'Comunicação',
    'Liderança',
    'Organização',
    'Empatia',
    'Análise de Dados',
    'Trabalho em Equipe',
    'Resolução de Problemas',
    'Pensamento Crítico'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sticky Feedback - Fica fixo no canto */}
      <StickyFeedback feedbacks={feedbacks} processingScore={processingScore} />

      {/* Barra de Progresso Inteligente */}
      {processingScore > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-100 rounded-full h-3 overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
            initial={{ width: 0 }}
            animate={{ width: `${processingScore}%` }}
            transition={{ duration: 0.5 }}
          />
          <p className="text-xs text-center mt-1 text-gray-600">
            Análise de Perfil Profissional: {processingScore}%
          </p>
        </motion.div>
      )}

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
          className="border-[#10b981] transition-all focus:scale-[1.02]"
          required
        />
      </motion.div>

      {/* Nível Atual */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <TrendingUp className="w-4 h-4" />
          Qual seu nível acadêmico atual?
        </Label>
        <Select value={formData.currentLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, currentLevel: value }))}>
          <SelectTrigger className="border-[#10b981]">
            <SelectValue placeholder="Selecione seu nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fundamental">Cursando Ensino Fundamental</SelectItem>
            <SelectItem value="medio">Cursando Ensino Médio</SelectItem>
            <SelectItem value="medio-completo">Ensino Médio Completo</SelectItem>
            <SelectItem value="superior">Cursando Ensino Superior</SelectItem>
            <SelectItem value="superior-completo">Ensino Superior Completo</SelectItem>
            <SelectItem value="pos">Pós-Graduação</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Áreas de Interesse */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Heart className="w-4 h-4" />
          Áreas de Interesse
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {interests.map((interest) => (
            <motion.button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg border-2 transition-all text-sm ${
                formData.interests.includes(interest)
                  ? 'bg-[#10b981] text-white border-[#10b981] shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#10b981]'
              }`}
            >
              {interest}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Habilidades */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Sparkles className="w-4 h-4" />
          Suas Principais Habilidades
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill) => (
            <motion.button
              key={skill}
              type="button"
              onClick={() => handleSkillToggle(skill)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg border-2 transition-all ${
                formData.skills.includes(skill)
                  ? 'bg-[#f59e0b] text-white border-[#f59e0b] shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#f59e0b]'
              }`}
            >
              {skill}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Estilo de Trabalho */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Users className="w-4 h-4" />
          Como você prefere trabalhar?
        </Label>
        <Select value={formData.workStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, workStyle: value }))}>
          <SelectTrigger className="border-[#10b981]">
            <SelectValue placeholder="Escolha seu estilo de trabalho" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equipe">Em equipe, colaborando com outros</SelectItem>
            <SelectItem value="independente">Independente, com autonomia</SelectItem>
            <SelectItem value="lideranca">Liderando e gerenciando pessoas</SelectItem>
            <SelectItem value="hibrido">Híbrido (equipe e trabalho solo)</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Tipo de Personalidade */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-2"
      >
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Heart className="w-4 h-4" />
          Você se considera mais...
        </Label>
        <Select value={formData.personalityType} onValueChange={(value) => setFormData(prev => ({ ...prev, personalityType: value }))}>
          <SelectTrigger className="border-[#10b981]">
            <SelectValue placeholder="Escolha o que mais combina com você" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="analitico">Analítico e orientado a dados</SelectItem>
            <SelectItem value="criativo">Criativo e inovador</SelectItem>
            <SelectItem value="pratico">Prático e orientado a resultados</SelectItem>
            <SelectItem value="social">Social e voltado para pessoas</SelectItem>
            <SelectItem value="empreendedor">Empreendedor e com espírito de negócios</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Expectativa Salarial */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-2"
      >
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Briefcase className="w-4 h-4" />
          Expectativa de Remuneração Futura
        </Label>
        <Select value={formData.salary} onValueChange={(value) => setFormData(prev => ({ ...prev, salary: value }))}>
          <SelectTrigger className="border-[#10b981]">
            <SelectValue placeholder="Qual sua expectativa?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flexivel">Flexível - priorizo satisfação pessoal</SelectItem>
            <SelectItem value="media">Salário médio do mercado</SelectItem>
            <SelectItem value="alta">Remuneração acima da média</SelectItem>
            <SelectItem value="muito-alta">Altas remunerações são prioridade</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Hobbies */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-2"
      >
        <Label htmlFor="hobbies" className="flex items-center gap-2 text-[#1e3a8a]">
          <Gamepad2 className="w-4 h-4" />
          Seus Hobbies e Paixões
        </Label>
        <Input
          id="hobbies"
          placeholder="Ex: Gaming, fotografia, esportes, música, tecnologia..."
          value={formData.hobbies}
          onChange={(e) => setFormData(prev => ({ ...prev, hobbies: e.target.value }))}
          className="border-[#10b981]"
        />
        <p className="text-xs text-gray-500">
          Muitas carreiras de sucesso nasceram de hobbies! Compartilhe os seus.
        </p>
      </motion.div>

      {/* Carreira dos Sonhos */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-2"
      >
        <Label htmlFor="dreamCareer" className="text-[#1e3a8a]">
          Se pudesse escolher, qual seria sua carreira ideal?
        </Label>
        <Input
          id="dreamCareer"
          placeholder="Ex: Médico, Programador, Designer, Advogado, Professor..."
          value={formData.dreamCareer}
          onChange={(e) => setFormData(prev => ({ ...prev, dreamCareer: e.target.value }))}
          className="border-[#10b981]"
        />
      </motion.div>

      {/* Pontos Fortes */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-2"
      >
        <Label htmlFor="strengths" className="text-[#1e3a8a]">
          Quais são seus maiores pontos fortes?
        </Label>
        <Textarea
          id="strengths"
          placeholder="Ex: Sou bom em resolver problemas, tenho facilidade para aprender novas tecnologias, me comunico bem..."
          value={formData.strengths}
          onChange={(e) => setFormData(prev => ({ ...prev, strengths: e.target.value }))}
          className="border-[#10b981] min-h-[80px]"
        />
      </motion.div>

      <Button
        type="submit"
        disabled={isLoading || !formData.currentLevel || formData.interests.length === 0}
        className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analisando seu perfil...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Gerar Recomendações de Carreira
          </span>
        )}
      </Button>
    </form>
  );
}
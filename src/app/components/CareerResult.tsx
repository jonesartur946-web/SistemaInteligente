import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Briefcase, GraduationCap, TrendingUp, Lightbulb, Target, ArrowLeft, CheckCircle2, Star, FileDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export interface CareerRecommendation {
  topCareers: Array<{
    title: string;
    description: string;
    education: string;
    growth: string;
    salary: string;
  }>;
  courses: string[];
  skills: string[];
  roadmap: string[];
  opportunities: string[];
  motivation: string;
}

interface CareerResultProps {
  recommendation: CareerRecommendation;
  userName: string;
  onReset: () => void;
  onGeneratePDF: () => void;
}

export function CareerResult({ recommendation, userName, onReset, onGeneratePDF }: CareerResultProps) {
  const [showPDFDialog, setShowPDFDialog] = useState(false);

  const handleGeneratePDF = () => {
    onGeneratePDF();
    setShowPDFDialog(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-[#1e3a8a] flex items-center gap-2">
          <Target className="w-6 h-6 text-[#10b981]" />
          Suas Recomendações de Carreira
        </h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowPDFDialog(true)} 
            className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669]"
          >
            <FileDown className="w-4 h-4" />
            Gerar PDF
          </Button>
          <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Nova Consulta
          </Button>
        </div>
      </div>

      {/* PDF Dialog */}
      <Dialog open={showPDFDialog} onOpenChange={setShowPDFDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileDown className="w-5 h-5 text-[#10b981]" />
              Gerar Relatório em PDF
            </DialogTitle>
            <DialogDescription>
              {userName}, deseja gerar um relatório PDF das suas recomendações de carreira? 
              Este documento completo poderá ser compartilhado com orientadores, família ou guardado para consultas futuras!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPDFDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleGeneratePDF} className="bg-[#10b981] hover:bg-[#059669]">
              <FileDown className="w-4 h-4 mr-2" />
              Gerar PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mensagem Motivacional */}
      <Card className="p-6 bg-gradient-to-r from-[#10b981] to-[#059669] text-white">
        <p className="text-lg leading-relaxed">{recommendation.motivation}</p>
      </Card>

      {/* Top Carreiras Recomendadas */}
      <div className="space-y-4">
        <h3 className="text-xl text-[#1e3a8a] flex items-center gap-2">
          <Star className="w-5 h-5 text-[#f59e0b]" />
          Carreiras Mais Indicadas para Você
        </h3>
        {recommendation.topCareers.map((career, index) => (
          <Card key={index} className="p-6 border-2 border-[#10b981] hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#059669] text-white rounded-full flex items-center justify-center text-xl font-bold">
                {index + 1}
              </div>
              <div className="flex-1 space-y-3">
                <h4 className="text-xl font-semibold text-[#1e3a8a]">{career.title}</h4>
                <p className="text-gray-700">{career.description}</p>
                <div className="grid md:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      Formação
                    </p>
                    <p className="text-sm font-medium text-gray-800">{career.education}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Crescimento
                    </p>
                    <p className="text-sm font-medium text-gray-800">{career.growth}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      Remuneração
                    </p>
                    <p className="text-sm font-medium text-gray-800">{career.salary}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Cursos e Formações */}
      <Card className="p-6 border-2 border-[#3b82f6]">
        <h3 className="text-xl text-[#1e3a8a] mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#3b82f6]" />
          Cursos e Formações Recomendados
        </h3>
        <ul className="space-y-3">
          {recommendation.courses.map((course, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{course}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Habilidades a Desenvolver */}
      <Card className="p-6 border-2 border-[#f59e0b]">
        <h3 className="text-xl text-[#1e3a8a] mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#f59e0b]" />
          Habilidades para Desenvolver
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {recommendation.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-[#f59e0b] rounded-full flex-shrink-0" />
              <span className="text-gray-700">{skill}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Roadmap de Carreira */}
      <Card className="p-6 border-2 border-[#8b5cf6]">
        <h3 className="text-xl text-[#1e3a8a] mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#8b5cf6]" />
          Roadmap: Próximos Passos
        </h3>
        <div className="space-y-3">
          {recommendation.roadmap.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#8b5cf6] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 font-bold">
                {index + 1}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-gray-700">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Oportunidades e Mercado */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-[#10b981]">
        <h3 className="text-xl text-[#1e3a8a] mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#10b981]" />
          Oportunidades e Perspectivas de Mercado
        </h3>
        <ul className="space-y-2">
          {recommendation.opportunities.map((opportunity, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-[#10b981] flex-shrink-0">✓</span>
              <span className="text-gray-700">{opportunity}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Button onClick={onReset} className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-6 text-lg">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Fazer Nova Análise de Carreira
      </Button>
    </div>
  );
}
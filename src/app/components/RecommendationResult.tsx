import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, Clock, Target, Lightbulb, TrendingUp, ArrowLeft, CheckCircle2, FileDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export interface Recommendation {
  studyPlan: string[];
  techniques: string[];
  resources: string[];
  schedule: string[];
  tips: string[];
  motivation: string;
}

interface RecommendationResultProps {
  recommendation: Recommendation;
  userName: string;
  onReset: () => void;
  onGeneratePDF: () => void;
}

export function RecommendationResult({ recommendation, userName, onReset, onGeneratePDF }: RecommendationResultProps) {
  const [showPDFDialog, setShowPDFDialog] = useState(false);

  const handleGeneratePDF = () => {
    onGeneratePDF();
    setShowPDFDialog(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-[#1e3a8a] flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#10b981]" />
          Seu Plano de Estudos Personalizado
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
              {userName}, deseja gerar um relatório PDF do seu plano de estudos personalizado? 
              Este documento poderá ser salvo, impresso e consultado sempre que necessário!
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
      <Card className="p-6 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white">
        <p className="text-lg leading-relaxed">{recommendation.motivation}</p>
      </Card>

      {/* Plano de Estudos */}
      <Card className="p-6 border-2 border-[#3b82f6]">
        <h3 className="text-xl text-[#1e3a8a] mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#3b82f6]" />
          Plano de Estudos Recomendado
        </h3>
        <ul className="space-y-3">
          {recommendation.studyPlan.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Técnicas de Aprendizagem */}
      <Card className="p-6 border-2 border-[#10b981]">
        <h3 className="text-xl text-[#1e3a8a] mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#10b981]" />
          Técnicas de Aprendizagem
        </h3>
        <ul className="space-y-3">
          {recommendation.techniques.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#10b981] rounded-full flex-shrink-0 mt-2" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Cronograma Sugerido */}
      <Card className="p-6 border-2 border-[#f59e0b]">
        <h3 className="text-xl text-[#1e3a8a] mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#f59e0b]" />
          Cronograma Sugerido
        </h3>
        <div className="space-y-3">
          {recommendation.schedule.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-6 h-6 bg-[#f59e0b] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                {index + 1}
              </div>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recursos Recomendados */}
      <Card className="p-6 border-2 border-[#8b5cf6]">
        <h3 className="text-xl text-[#1e3a8a] mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#8b5cf6]" />
          Recursos Recomendados
        </h3>
        <ul className="space-y-3">
          {recommendation.resources.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#8b5cf6] rounded-full flex-shrink-0 mt-2" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Dicas Extras */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-[#10b981]">
        <h3 className="text-xl text-[#1e3a8a] mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#10b981]" />
          Dicas para Maximizar seus Resultados
        </h3>
        <ul className="space-y-2">
          {recommendation.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-[#10b981] flex-shrink-0">✓</span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Button onClick={onReset} className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-6 text-lg">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Fazer Nova Recomendação
      </Button>
    </div>
  );
}
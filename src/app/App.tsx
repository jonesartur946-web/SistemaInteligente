import React, { useState } from 'react';
import { RecommendationForm } from './components/RecommendationForm';
import { RecommendationResult, Recommendation } from './components/RecommendationResult';
import { CareerForm, CareerFormData } from './components/CareerForm';
import { CareerResult, CareerRecommendation } from './components/CareerResult';
import { generateRecommendation } from './utils/aiRecommendation';
import { generateCareerRecommendation } from './utils/careerRecommendation';
import { generateStudyPDF, generateCareerPDF } from './utils/generatePDF';
import { speakSuccess } from './utils/speechService';
import { GraduationCap, Sparkles, BookOpen, Briefcase } from 'lucide-react';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

interface FormData {
  userName: string;
  gradeLevel: string;
  subjects: string[];
  studyTime: string;
  learningStyle: string;
  hobbies: string;
}

export default function App() {
  const [isLoadingStudy, setIsLoadingStudy] = useState(false);
  const [isLoadingCareer, setIsLoadingCareer] = useState(false);
  const [studyRecommendation, setStudyRecommendation] = useState<Recommendation | null>(null);
  const [careerRecommendation, setCareerRecommendation] = useState<CareerRecommendation | null>(null);
  const [studyUserName, setStudyUserName] = useState('');
  const [careerUserName, setCareerUserName] = useState('');

  const handleStudySubmit = async (formData: FormData) => {
    setIsLoadingStudy(true);
    setStudyUserName(formData.userName);
    try {
      const result = await generateRecommendation(formData);
      setStudyRecommendation(result);
      // Falar o sucesso após processar
      await speakSuccess(formData.userName);
    } catch (error) {
      console.error('Erro ao gerar recomendações de estudo:', error);
    } finally {
      setIsLoadingStudy(false);
    }
  };

  const handleCareerSubmit = async (formData: CareerFormData) => {
    setIsLoadingCareer(true);
    setCareerUserName(formData.userName);
    try {
      const result = await generateCareerRecommendation(formData);
      setCareerRecommendation(result);
      // Falar o sucesso após processar
      await speakSuccess(formData.userName);
    } catch (error) {
      console.error('Erro ao gerar recomendações de carreira:', error);
    } finally {
      setIsLoadingCareer(false);
    }
  };

  const handleStudyReset = () => {
    setStudyRecommendation(null);
    setStudyUserName('');
  };

  const handleCareerReset = () => {
    setCareerRecommendation(null);
    setCareerUserName('');
  };

  const handleGenerateStudyPDF = () => {
    if (studyRecommendation && studyUserName) {
      generateStudyPDF(studyUserName, studyRecommendation);
    }
  };

  const handleGenerateCareerPDF = () => {
    if (careerRecommendation && careerUserName) {
      generateCareerPDF(careerUserName, careerRecommendation);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <GraduationCap className="w-8 h-8 text-[#3b82f6]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AngoLearn</h1>
              <p className="text-blue-100 text-sm">Plataforma Inteligente de Recomendação de Estudos e Carreira</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="study" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1">
            <TabsTrigger 
              value="study" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white"
            >
              <BookOpen className="w-5 h-5" />
              <span className="hidden sm:inline">Recomendação de</span> Estudos
            </TabsTrigger>
            <TabsTrigger 
              value="career"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-[#10b981] data-[state=active]:text-white"
            >
              <Briefcase className="w-5 h-5" />
              <span className="hidden sm:inline">Recomendação de</span> Carreira
            </TabsTrigger>
          </TabsList>

          {/* Study Tab */}
          <TabsContent value="study" className="mt-0">
            {!studyRecommendation ? (
              <div className="space-y-6">
                {/* Hero Section - Study */}
                <Card className="p-8 bg-white shadow-xl border-t-4 border-[#3b82f6]">
                  <div className="text-center space-y-4 mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3b82f6] to-[#10b981] text-white px-4 py-2 rounded-full">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-medium">Powered by AI</span>
                    </div>
                    <h2 className="text-3xl text-[#1e3a8a]">
                      Receba um Plano de Estudos Personalizado
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                      Responda algumas perguntas e nossa inteligência artificial criará um plano de estudos exclusivo para você, com técnicas, recursos e cronograma adaptados ao seu perfil.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl mb-2">🎯</div>
                      <h3 className="font-semibold text-[#1e3a8a]">Personalizado</h3>
                      <p className="text-sm text-gray-600">Adaptado ao seu perfil</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl mb-2">🧠</div>
                      <h3 className="font-semibold text-[#1e3a8a]">Inteligente</h3>
                      <p className="text-sm text-gray-600">Baseado em IA</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-3xl mb-2">📚</div>
                      <h3 className="font-semibold text-[#1e3a8a]">Completo</h3>
                      <p className="text-sm text-gray-600">Recursos e técnicas</p>
                    </div>
                  </div>
                </Card>

                {/* Form */}
                <Card className="p-8 bg-white shadow-xl">
                  <RecommendationForm onSubmit={handleStudySubmit} isLoading={isLoadingStudy} />
                </Card>
              </div>
            ) : (
              <RecommendationResult 
                recommendation={studyRecommendation} 
                userName={studyUserName}
                onReset={handleStudyReset}
                onGeneratePDF={handleGenerateStudyPDF}
              />
            )}
          </TabsContent>

          {/* Career Tab */}
          <TabsContent value="career" className="mt-0">
            {!careerRecommendation ? (
              <div className="space-y-6">
                {/* Hero Section - Career */}
                <Card className="p-8 bg-white shadow-xl border-t-4 border-[#10b981]">
                  <div className="text-center space-y-4 mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#10b981] to-[#3b82f6] text-white px-4 py-2 rounded-full">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-medium">Powered by AI</span>
                    </div>
                    <h2 className="text-3xl text-[#1e3a8a]">
                      Descubra a Carreira Ideal para Você
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                      Preencha o questionário e receba recomendações personalizadas de carreiras, cursos e um roadmap completo para alcançar seus objetivos profissionais.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl mb-2">💼</div>
                      <h3 className="font-semibold text-[#1e3a8a]">Carreiras</h3>
                      <p className="text-sm text-gray-600">Profissões ideais para você</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl mb-2">🎓</div>
                      <h3 className="font-semibold text-[#1e3a8a]">Formações</h3>
                      <p className="text-sm text-gray-600">Cursos recomendados</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl mb-2">🚀</div>
                      <h3 className="font-semibold text-[#1e3a8a]">Roadmap</h3>
                      <p className="text-sm text-gray-600">Caminho para o sucesso</p>
                    </div>
                  </div>
                </Card>

                {/* Form */}
                <Card className="p-8 bg-white shadow-xl">
                  <CareerForm onSubmit={handleCareerSubmit} isLoading={isLoadingCareer} />
                </Card>
              </div>
            ) : (
              <CareerResult 
                recommendation={careerRecommendation}
                userName={careerUserName}
                onReset={handleCareerReset}
                onGeneratePDF={handleGenerateCareerPDF}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-blue-200">
            © 2026 AngoLearn - Transformando estudantes em campeões através da educação personalizada, orintado por Herculano Simão.
          </p>
          <p className="text-sm text-blue-300 mt-2">
            Desenvolvido com tecnologia de IA para potencializar seu aprendizado e carreira
          </p>
        </div>
      </footer>
    </div>
  );
}
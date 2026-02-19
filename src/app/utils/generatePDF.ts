import jsPDF from 'jspdf';
import { Recommendation } from '../components/RecommendationResult';
import { CareerRecommendation } from '../components/CareerResult';

export function generateStudyPDF(userName: string, recommendation: Recommendation) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPos = 20;

  // Header
  doc.setFontSize(20);
  doc.setTextColor(30, 58, 138); // #1e3a8a
  doc.text('AngoLearn', margin, yPos);
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139);
  doc.text('Plataforma Inteligente de Recomendacao de Estudos', margin, yPos);
  
  yPos += 15;
  doc.setFontSize(16);
  doc.setTextColor(30, 58, 138);
  doc.text(`Plano de Estudos Personalizado - ${userName}`, margin, yPos);
  
  yPos += 15;
  doc.setLineWidth(0.5);
  doc.setDrawColor(59, 130, 246);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  
  yPos += 15;

  // Mensagem Motivacional
  doc.setFontSize(11);
  doc.setTextColor(59, 130, 246);
  doc.text('MENSAGEM MOTIVACIONAL', margin, yPos);
  yPos += 8;
  doc.setTextColor(60, 60, 60);
  const motivationLines = doc.splitTextToSize(recommendation.motivation, maxWidth);
  doc.text(motivationLines, margin, yPos);
  yPos += (motivationLines.length * 6) + 10;

  // Plano de Estudos
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(11);
  doc.setTextColor(59, 130, 246);
  doc.text('PLANO DE ESTUDOS RECOMENDADO', margin, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  recommendation.studyPlan.forEach((item, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const itemLines = doc.splitTextToSize(`${index + 1}. ${item}`, maxWidth - 5);
    doc.text(itemLines, margin, yPos);
    yPos += (itemLines.length * 5) + 3;
  });
  yPos += 5;

  // Técnicas de Aprendizagem
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(11);
  doc.setTextColor(16, 185, 129);
  doc.text('TECNICAS DE APRENDIZAGEM', margin, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  recommendation.techniques.forEach((item) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const itemLines = doc.splitTextToSize(`• ${item}`, maxWidth - 5);
    doc.text(itemLines, margin, yPos);
    yPos += (itemLines.length * 5) + 3;
  });
  yPos += 5;

  // Cronograma Sugerido
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(11);
  doc.setTextColor(245, 158, 11);
  doc.text('CRONOGRAMA SUGERIDO', margin, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  recommendation.schedule.forEach((item, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const itemLines = doc.splitTextToSize(`${index + 1}. ${item}`, maxWidth - 5);
    doc.text(itemLines, margin, yPos);
    yPos += (itemLines.length * 5) + 3;
  });
  yPos += 5;

  // Recursos Recomendados
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(11);
  doc.setTextColor(139, 92, 246);
  doc.text('RECURSOS RECOMENDADOS', margin, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  recommendation.resources.forEach((item) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const itemLines = doc.splitTextToSize(`• ${item}`, maxWidth - 5);
    doc.text(itemLines, margin, yPos);
    yPos += (itemLines.length * 5) + 3;
  });
  yPos += 5;

  // Dicas
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(11);
  doc.setTextColor(16, 185, 129);
  doc.text('DICAS PARA MAXIMIZAR RESULTADOS', margin, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  recommendation.tips.forEach((item) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const itemLines = doc.splitTextToSize(`• ${item}`, maxWidth - 5);
    doc.text(itemLines, margin, yPos);
    yPos += (itemLines.length * 5) + 3;
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `AngoLearn - Pagina ${i} de ${pageCount} - Gerado em ${new Date().toLocaleDateString('pt-BR')}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Download
  doc.save(`AngoLearn_Plano_Estudos_${userName.replace(/\s+/g, '_')}.pdf`);
}

export function generateCareerPDF(userName: string, recommendation: CareerRecommendation) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPos = 20;

  // Header
  doc.setFontSize(20);
  doc.setTextColor(30, 58, 138);
  doc.text('AngoLearn', margin, yPos);
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139);
  doc.text('Plataforma Inteligente de Recomendacao de Carreira', margin, yPos);
  
  yPos += 15;
  doc.setFontSize(16);
  doc.setTextColor(30, 58, 138);
  doc.text(`Recomendacoes de Carreira - ${userName}`, margin, yPos);
  
  yPos += 15;
  doc.setLineWidth(0.5);
  doc.setDrawColor(16, 185, 129);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  
  yPos += 15;

  // Mensagem Motivacional
  doc.setFontSize(11);
  doc.setTextColor(16, 185, 129);
  doc.text('MENSAGEM MOTIVACIONAL', margin, yPos);
  yPos += 8;
  doc.setTextColor(60, 60, 60);
  const motivationLines = doc.splitTextToSize(recommendation.motivation, maxWidth);
  doc.text(motivationLines, margin, yPos);
  yPos += (motivationLines.length * 6) + 10;

  // Carreiras Recomendadas
  recommendation.topCareers.forEach((career, index) => {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text(`CARREIRA ${index + 1}: ${career.title}`, margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const descLines = doc.splitTextToSize(career.description, maxWidth);
    doc.text(descLines, margin, yPos);
    yPos += (descLines.length * 5) + 5;
    
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Formacao: ${career.education}`, margin + 3, yPos);
    yPos += 5;
    doc.text(`Crescimento: ${career.growth}`, margin + 3, yPos);
    yPos += 5;
    doc.text(`Remuneracao: ${career.salary}`, margin + 3, yPos);
    yPos += 10;
  });

  // Cursos e Formações
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(11);
  doc.setTextColor(59, 130, 246);
  doc.text('CURSOS E FORMACOES RECOMENDADOS', margin, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  recommendation.courses.forEach((item) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const itemLines = doc.splitTextToSize(`• ${item}`, maxWidth - 5);
    doc.text(itemLines, margin, yPos);
    yPos += (itemLines.length * 5) + 3;
  });
  yPos += 5;

  // Habilidades
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(11);
  doc.setTextColor(245, 158, 11);
  doc.text('HABILIDADES PARA DESENVOLVER', margin, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  recommendation.skills.forEach((item) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const itemLines = doc.splitTextToSize(`• ${item}`, maxWidth - 5);
    doc.text(itemLines, margin, yPos);
    yPos += (itemLines.length * 5) + 3;
  });
  yPos += 5;

  // Roadmap
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(11);
  doc.setTextColor(139, 92, 246);
  doc.text('ROADMAP: PROXIMOS PASSOS', margin, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  recommendation.roadmap.forEach((item, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const itemLines = doc.splitTextToSize(`${index + 1}. ${item}`, maxWidth - 5);
    doc.text(itemLines, margin, yPos);
    yPos += (itemLines.length * 5) + 3;
  });
  yPos += 5;

  // Oportunidades
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(11);
  doc.setTextColor(16, 185, 129);
  doc.text('OPORTUNIDADES E PERSPECTIVAS', margin, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  recommendation.opportunities.forEach((item) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const itemLines = doc.splitTextToSize(`• ${item}`, maxWidth - 5);
    doc.text(itemLines, margin, yPos);
    yPos += (itemLines.length * 5) + 3;
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `AngoLearn - Pagina ${i} de ${pageCount} - Gerado em ${new Date().toLocaleDateString('pt-BR')}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Download
  doc.save(`AngoLearn_Carreira_${userName.replace(/\s+/g, '_')}.pdf`);
}

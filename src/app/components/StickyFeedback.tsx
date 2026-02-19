import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, CheckCircle, Zap, TrendingUp, Lightbulb } from 'lucide-react';

export interface Feedback {
  id: number;
  message: string;
  type: 'analyzing' | 'insight' | 'success' | 'processing';
}

interface StickyFeedbackProps {
  feedbacks: Feedback[];
  processingScore: number;
}

export function StickyFeedback({ feedbacks, processingScore }: StickyFeedbackProps) {
  if (feedbacks.length === 0) return null;

  const getIcon = (type: Feedback['type']) => {
    switch (type) {
      case 'analyzing':
        return <Brain className="w-5 h-5" />;
      case 'insight':
        return <Lightbulb className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'processing':
        return <Zap className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getColor = (type: Feedback['type']) => {
    switch (type) {
      case 'analyzing':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
      case 'insight':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/30';
      case 'success':
        return 'bg-green-500/10 text-green-600 border-green-500/30';
      case 'processing':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/30';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/30';
    }
  };

  const latestFeedback = feedbacks[feedbacks.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)]"
    >
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header com Score */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              <span className="font-semibold text-lg">IA Analisando</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-bold text-xl">{processingScore}%</span>
            </div>
          </div>
          
          {/* Barra de Progresso */}
          <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${processingScore}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Feedbacks */}
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {feedbacks.slice(-3).map((feedback) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-xl border-2 ${getColor(feedback.type)} flex items-start gap-3`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(feedback.type)}
                </div>
                <p className="text-sm leading-relaxed font-medium">
                  {feedback.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer com Status */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">Perfil Completo</span>
            <div className="flex items-center gap-2">
              {processingScore >= 100 ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-bold">100%</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                  <span className="text-blue-600 font-bold">{processingScore}%</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pulso animado quando ativo */}
      {processingScore > 0 && processingScore < 100 && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-4 border-blue-400/50 pointer-events-none"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.5, 0.2, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.div>
  );
}

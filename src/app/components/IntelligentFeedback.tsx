import React, { useEffect, useState } from 'react';
import { Sparkles, Brain, TrendingUp, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IntelligentFeedbackProps {
  message: string;
  type?: 'analyzing' | 'insight' | 'success' | 'processing';
  playSound?: boolean;
}

export function IntelligentFeedback({ message, type = 'analyzing', playSound = true }: IntelligentFeedbackProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (playSound) {
      // Criar um som de feedback sutil usando Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Sons diferentes para diferentes tipos
      if (type === 'insight') {
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
      } else if (type === 'success') {
        oscillator.frequency.value = 1000;
        oscillator.type = 'sine';
      } else {
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
      }

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }

    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, [message, type, playSound]);

  const icons = {
    analyzing: Brain,
    insight: Sparkles,
    success: Target,
    processing: TrendingUp
  };

  const colors = {
    analyzing: 'from-blue-500 to-purple-500',
    insight: 'from-yellow-500 to-orange-500',
    success: 'from-green-500 to-emerald-500',
    processing: 'from-indigo-500 to-blue-500'
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className={`p-4 rounded-lg bg-gradient-to-r ${colors[type]} text-white shadow-lg flex items-center gap-3`}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          <p className="text-sm font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

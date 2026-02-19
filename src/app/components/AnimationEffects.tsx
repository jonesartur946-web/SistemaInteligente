import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle, Zap } from 'lucide-react';

interface SuccessParticlesProps {
  trigger: boolean;
}

export function SuccessParticles({ trigger }: SuccessParticlesProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (trigger) {
      // Criar partículas
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50
      }));
      setParticles(newParticles);

      // Limpar após animação
      setTimeout(() => setParticles([]), 1500);
    }
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: [0, 1.5, 0],
            x: particle.x,
            y: particle.y,
            rotate: Math.random() * 360
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute"
        >
          {Math.random() > 0.5 ? (
            <Sparkles className="w-6 h-6 text-yellow-400" />
          ) : Math.random() > 0.5 ? (
            <CheckCircle className="w-6 h-6 text-green-400" />
          ) : (
            <Zap className="w-6 h-6 text-blue-400" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

interface PulseEffectProps {
  children: React.ReactNode;
  isActive: boolean;
}

export function PulseEffect({ children, isActive }: PulseEffectProps) {
  return (
    <motion.div
      animate={
        isActive
          ? {
              scale: [1, 1.02, 1],
              boxShadow: [
                '0 0 0 0 rgba(59, 130, 246, 0)',
                '0 0 0 10px rgba(59, 130, 246, 0.1)',
                '0 0 0 0 rgba(59, 130, 246, 0)'
              ]
            }
          : {}
      }
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

interface FloatingIconProps {
  icon: React.ReactNode;
  delay?: number;
}

export function FloatingIcon({ icon, delay = 0 }: FloatingIconProps) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    >
      {icon}
    </motion.div>
  );
}

interface GlowingTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowingText({ children, className = '' }: GlowingTextProps) {
  return (
    <motion.span
      animate={{
        textShadow: [
          '0 0 10px rgba(59, 130, 246, 0.5)',
          '0 0 20px rgba(59, 130, 246, 0.8)',
          '0 0 10px rgba(59, 130, 246, 0.5)'
        ]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

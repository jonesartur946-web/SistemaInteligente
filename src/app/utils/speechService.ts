// Utilitário para síntese de voz usando Web Speech API

export interface SpeechOptions {
  text: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
    }
  }

  private loadVoices() {
    if (!this.synth) return;

    const loadVoicesList = () => {
      this.voices = this.synth!.getVoices();
    };

    loadVoicesList();
    
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoicesList;
    }
  }

  speak(options: SpeechOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        console.warn('Speech synthesis não suportado neste navegador');
        resolve();
        return;
      }

      // Cancelar qualquer fala em andamento
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(options.text);
      
      // Configurações
      utterance.lang = options.lang || 'pt-BR';
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;

      // Tentar encontrar uma voz em português
      const portugueseVoice = this.voices.find(
        voice => voice.lang.includes('pt-BR') || voice.lang.includes('pt-PT')
      );
      
      if (portugueseVoice) {
        utterance.voice = portugueseVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (error) => {
        console.error('Erro na síntese de voz:', error);
        resolve(); // Resolve mesmo com erro para não travar a aplicação
      };

      this.synth.speak(utterance);
    });
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  isSupported(): boolean {
    return this.synth !== null;
  }
}

// Exportar instância única
export const speechService = new SpeechService();

// Funções auxiliares para mensagens específicas
export const speakSuccess = async (userName?: string) => {
  const greeting = userName ? `, ${userName.split(' ')[0]}` : '';
  await speechService.speak({
    text: `Os seus dados foram processados com sucesso${greeting}! As suas recomendações personalizadas estão prontas.`,
    rate: 0.95,
    pitch: 1.1
  });
};

export const speakWelcome = async () => {
  await speechService.speak({
    text: 'Bem-vindo ao AngoLearn! A plataforma inteligente que vai transformar seus estudos e carreira.',
    rate: 1.0,
    pitch: 1.0
  });
};

export const speakProgress = async (progress: number) => {
  if (progress === 25) {
    await speechService.speak({
      text: 'Análise iniciada. Continue preenchendo o formulário.',
      rate: 1.1
    });
  } else if (progress === 50) {
    await speechService.speak({
      text: 'Metade do caminho! Estamos aprendendo muito sobre você.',
      rate: 1.1
    });
  } else if (progress === 75) {
    await speechService.speak({
      text: 'Quase lá! Seus dados estão sendo processados pela inteligência artificial.',
      rate: 1.1
    });
  } else if (progress >= 100) {
    await speechService.speak({
      text: 'Perfil completo! Gerando suas recomendações personalizadas.',
      rate: 1.0,
      pitch: 1.2
    });
  }
};

export const speakCareerInsight = async (careerCount: number) => {
  await speechService.speak({
    text: `Identificamos ${careerCount} carreiras perfeitas para o seu perfil. Vamos descobrir juntos!`,
    rate: 1.0,
    pitch: 1.1
  });
};

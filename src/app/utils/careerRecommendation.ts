// Simulação de processamento de IA para recomendações de carreira

import { getCareerCourses, formatCareerCourses } from './careerCoursesMapping';

export interface CareerFormData {
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

export interface CareerRecommendation {
  topCareers: Array<{
    title: string;
    description: string;
    education: string;
    growth: string;
    salary: string;
    specificCourses?: string[]; // Cursos específicos para essa carreira
  }>;
  courses: string[];
  specificCareerPaths: Array<{ // NOVO: Caminhos específicos por carreira
    career: string;
    requiredCourses: string[];
    complementaryCourses: string[];
  }>;
  skills: string[];
  roadmap: string[];
  opportunities: string[];
  motivation: string;
}

// Banco de dados expandido de carreiras
const careerDatabase: Record<string, any> = {
  Tecnologia: {
    careers: [
      {
        title: 'Desenvolvedor de Software',
        description: 'Crie aplicações, sistemas e soluções tecnológicas que impactam milhões de pessoas.',
        education: 'Ciência da Computação, Engenharia de Software, Sistemas de Informação',
        growth: 'Alto - setor em expansão',
        salary: 'Kz 400.000 - Kz 1.500.000+'
      },
      {
        title: 'Analista de Dados / Data Scientist',
        description: 'Transforme dados em insights valiosos para tomada de decisões estratégicas.',
        education: 'Estatística, Ciência de Dados, Matemática Aplicada',
        growth: 'Muito Alto - profissão do futuro',
        salary: 'Kz 500.000 - Kz 2.000.000+'
      },
      {
        title: 'Engenheiro de Machine Learning',
        description: 'Desenvolva sistemas inteligentes que aprendem e evoluem automaticamente.',
        education: 'Ciência da Computação, Inteligência Artificial',
        growth: 'Muito Alto - IA em expansão',
        salary: 'Kz 600.000 - Kz 2.500.000+'
      },
      {
        title: 'Desenvolvedor Mobile',
        description: 'Crie aplicativos para iOS e Android que milhões usam diariamente.',
        education: 'Desenvolvimento Mobile, Ciência da Computação',
        growth: 'Muito Alto - mobile-first world',
        salary: 'Kz 450.000 - Kz 1.800.000+'
      },
      {
        title: 'Desenvolvedor Full Stack',
        description: 'Domine front-end e back-end para criar aplicações completas.',
        education: 'Ciência da Computação, Bootcamps especializados',
        growth: 'Muito Alto - profissionais completos valorizados',
        salary: 'Kz 500.000 - Kz 2.200.000+'
      },
      {
        title: 'Arquiteto de Software',
        description: 'Projete sistemas escaláveis e robustos para grandes empresas.',
        education: 'Engenharia de Software, experiência sênior',
        growth: 'Alto - empresas precisam de arquitetura sólida',
        salary: 'Kz 700.000 - Kz 3.000.000+'
      },
      {
        title: 'Engenheiro de Blockchain',
        description: 'Desenvolva soluções descentralizadas e criptomoedas do futuro.',
        education: 'Ciência da Computação, Criptografia',
        growth: 'Muito Alto - Web3 emergindo',
        salary: 'Kz 800.000 - Kz 3.500.000+'
      }
    ]
  },
  'Redes e Infraestrutura': {
    careers: [
      {
        title: 'Engenheiro de Redes',
        description: 'Projete, implemente e gerencie infraestruturas de redes complexas.',
        education: 'Redes de Computadores, Engenharia de Telecomunicações, Certificações (CCNA, CCNP)',
        growth: 'Alto - conectividade essencial',
        salary: 'Kz 450.000 - Kz 1.600.000+'
      },
      {
        title: 'Administrador de Sistemas',
        description: 'Mantenha servidores, sistemas e infraestrutura de TI funcionando perfeitamente.',
        education: 'Administração de Redes, Sistemas de Informação, Certificações Linux/Windows',
        growth: 'Estável e Alto - sempre necessário',
        salary: 'Kz 380.000 - Kz 1.300.000+'
      },
      {
        title: 'Arquiteto de Soluções Cloud',
        description: 'Desenhe e implemente arquiteturas em nuvem escaláveis e seguras.',
        education: 'Computação em Nuvem, Certificações AWS/Azure/Google Cloud',
        growth: 'Explosivo - migração para cloud',
        salary: 'Kz 600.000 - Kz 2.500.000+'
      },
      {
        title: 'Especialista em DevOps',
        description: 'Una desenvolvimento e operações para entregas rápidas e confiáveis.',
        education: 'DevOps, Engenharia de Software, Certificações (Docker, Kubernetes)',
        growth: 'Muito Alto - metodologia moderna',
        salary: 'Kz 550.000 - Kz 2.200.000+'
      },
      {
        title: 'Engenheiro de Infraestrutura de TI',
        description: 'Gerencie data centers, servidores e toda a infraestrutura tecnológica.',
        education: 'Infraestrutura de TI, Redes, Certificações VMware/Cisco',
        growth: 'Alto - backbone das empresas',
        salary: 'Kz 500.000 - Kz 1.900.000+'
      },
      {
        title: 'Especialista em Redes Sem Fio',
        description: 'Configure e otimize redes WiFi, 5G e tecnologias wireless.',
        education: 'Telecomunicações, Redes, Certificações wireless',
        growth: 'Alto - expansão do wireless',
        salary: 'Kz 420.000 - Kz 1.500.000+'
      }
    ]
  },
  Cibersegurança: {
    careers: [
      {
        title: 'Analista de Segurança da Informação',
        description: 'Proteja sistemas e dados contra ameaças e ataques cibernéticos.',
        education: 'Segurança da Informação, Ciência da Computação, Certificações (CEH, CISSP)',
        growth: 'Muito Alto - ameaças crescentes',
        salary: 'Kz 500.000 - Kz 2.000.000+'
      },
      {
        title: 'Especialista em Ethical Hacking',
        description: 'Teste sistemas hackeando eticamente para encontrar vulnerabilidades.',
        education: 'Segurança Cibernética, Certificações de Hacking Ético',
        growth: 'Explosivo - demanda altíssima',
        salary: 'Kz 650.000 - Kz 2.800.000+'
      },
      {
        title: 'Arquiteto de Segurança',
        description: 'Desenhe arquiteturas de segurança robustas para organizações.',
        education: 'Arquitetura de Segurança, Certificações avançadas (CISSP, CISM)',
        growth: 'Muito Alto - segurança crítica',
        salary: 'Kz 700.000 - Kz 3.000.000+'
      },
      {
        title: 'Analista de SOC (Security Operations Center)',
        description: 'Monitore e responda a incidentes de segurança em tempo real.',
        education: 'Segurança Cibernética, Certificações SOC',
        growth: 'Alto - centros de segurança essenciais',
        salary: 'Kz 450.000 - Kz 1.700.000+'
      }
    ]
  },
  Saúde: {
    careers: [
      {
        title: 'Médico',
        description: 'Cuide da saúde e salve vidas, com especialização em diversas áreas.',
        education: 'Medicina (6 anos) + Residência',
        growth: 'Estável - sempre necessário',
        salary: 'Kz 600.000 - Kz 3.000.000+'
      },
      {
        title: 'Enfermeiro',
        description: 'Preste cuidados diretos aos pacientes e coordene equipes de saúde.',
        education: 'Enfermagem (5 anos)',
        growth: 'Alto - demanda crescente',
        salary: 'Kz 280.000 - Kz 900.000+'
      },
      {
        title: 'Fisioterapeuta',
        description: 'Ajude pacientes a recuperar movimentos e qualidade de vida.',
        education: 'Fisioterapia (5 anos)',
        growth: 'Alto - envelhecimento populacional',
        salary: 'Kz 300.000 - Kz 1.000.000+'
      },
      {
        title: 'Farmacêutico',
        description: 'Gerencie medicamentos e oriente sobre tratamentos farmacológicos.',
        education: 'Farmácia (5 anos)',
        growth: 'Médio a Alto',
        salary: 'Kz 320.000 - Kz 1.100.000+'
      },
      {
        title: 'Dentista / Odontologista',
        description: 'Cuide da saúde bucal e transforme sorrisos, prevenindo e tratando problemas dentários.',
        education: 'Odontologia (5 anos)',
        growth: 'Alto - saúde bucal cada vez mais valorizada',
        salary: 'Kz 350.000 - Kz 1.800.000+'
      },
      {
        title: 'Dermatologista',
        description: 'Especialize-se em saúde da pele, tratamentos estéticos e dermatologia clínica.',
        education: 'Medicina + Residência em Dermatologia (9+ anos)',
        growth: 'Muito Alto - mercado estético em expansão',
        salary: 'Kz 700.000 - Kz 3.500.000+'
      },
      {
        title: 'Técnico de Análises Clínicas',
        description: 'Realize exames laboratoriais essenciais para diagnósticos médicos precisos.',
        education: 'Análises Clínicas e Saúde Pública (3-4 anos)',
        growth: 'Alto - laboratórios sempre necessários',
        salary: 'Kz 250.000 - Kz 900.000+'
      },
      {
        title: 'Especialista em Saúde Pública',
        description: 'Desenvolva políticas e programas para melhorar a saúde da população.',
        education: 'Saúde Pública, Medicina, Enfermagem + Especialização',
        growth: 'Alto - investimento governamental crescente',
        salary: 'Kz 400.000 - Kz 1.600.000+'
      },
      {
        title: 'Analista Clínico',
        description: 'Realize análises laboratoriais complexas, interprete exames e contribua para diagnósticos precisos.',
        education: 'Biomedicina, Análises Clínicas, Farmácia-Bioquímica',
        growth: 'Muito Alto - exames diagnósticos em expansão',
        salary: 'Kz 320.000 - Kz 1.200.000+'
      }
    ]
  },
  Educação: {
    careers: [
      {
        title: 'Professor / Educador',
        description: 'Transforme vidas através do conhecimento e forme futuras gerações.',
        education: 'Licenciatura na área de interesse',
        growth: 'Estável',
        salary: 'Kz 200.000 - Kz 800.000+'
      },
      {
        title: 'Pedagogo',
        description: 'Desenvolva estratégias de ensino e coordene processos educacionais.',
        education: 'Pedagogia',
        growth: 'Médio',
        salary: 'Kz 240.000 - Kz 650.000+'
      },
      {
        title: 'Designer Instrucional',
        description: 'Crie experiências de aprendizagem digital e cursos online.',
        education: 'Educação, Design Instrucional, Tecnologias Educacionais',
        growth: 'Muito Alto - educação online crescendo',
        salary: 'Kz 350.000 - Kz 1.200.000+'
      },
      {
        title: 'Psicopedagogo',
        description: 'Identifique e trate dificuldades de aprendizagem, auxiliando estudantes.',
        education: 'Psicopedagogia, Pedagogia + Especialização',
        growth: 'Alto - necessidades especiais em foco',
        salary: 'Kz 280.000 - Kz 900.000+'
      },
      {
        title: 'Coordenador Pedagógico',
        description: 'Lidere equipes de professores e implemente projetos educacionais.',
        education: 'Pedagogia, Licenciatura + experiência',
        growth: 'Médio',
        salary: 'Kz 320.000 - Kz 1.000.000+'
      },
      {
        title: 'Professor de Educação Especial',
        description: 'Trabalhe com alunos com necessidades educacionais especiais.',
        education: 'Pedagogia/Licenciatura + Especialização em Ed. Especial',
        growth: 'Alto - inclusão em expansão',
        salary: 'Kz 250.000 - Kz 850.000+'
      }
    ]
  },
  'Arte e Design': {
    careers: [
      {
        title: 'Designer UX/UI',
        description: 'Crie experiências digitais incríveis e interfaces intuitivas.',
        education: 'Design, Design Digital, cursos especializados',
        growth: 'Muito Alto',
        salary: 'Kz 320.000 - Kz 1.400.000+'
      },
      {
        title: 'Designer Gráfico',
        description: 'Desenvolva identidades visuais, materiais gráficos e peças criativas.',
        education: 'Design Gráfico, Publicidade',
        growth: 'Médio',
        salary: 'Kz 200.000 - Kz 950.000+'
      },
      {
        title: 'Motion Designer',
        description: 'Crie animações, vídeos e conteúdo visual em movimento.',
        education: 'Design, Animação, cursos especializados',
        growth: 'Alto - conteúdo audiovisual em alta',
        salary: 'Kz 380.000 - Kz 1.300.000+'
      },
      {
        title: 'Diretor de Arte',
        description: 'Lidere projetos criativos e defina identidades visuais de marcas.',
        education: 'Design, Publicidade, experiência comprovada',
        growth: 'Médio a Alto',
        salary: 'Kz 450.000 - Kz 1.800.000+'
      },
      {
        title: 'Ilustrador Digital',
        description: 'Crie ilustrações para livros, jogos, publicidade e mídias digitais.',
        education: 'Design, Artes Visuais, cursos de ilustração',
        growth: 'Alto - conteúdo visual em expansão',
        salary: 'Kz 250.000 - Kz 1.100.000+'
      },
      {
        title: 'Designer de Produto',
        description: 'Projete produtos físicos e digitais com foco em usabilidade e estética.',
        education: 'Design de Produto, Design Industrial',
        growth: 'Alto - inovação em produtos',
        salary: 'Kz 350.000 - Kz 1.500.000+'
      },
      {
        title: 'Fotógrafo Profissional',
        description: 'Capture momentos e crie narrativas visuais através da fotografia.',
        education: 'Fotografia, Artes Visuais, cursos técnicos',
        growth: 'Médio - mercado competitivo',
        salary: 'Kz 220.000 - Kz 1.200.000+'
      }
    ]
  },
  Negócios: {
    careers: [
      {
        title: 'Administrador de Empresas',
        description: 'Gerencie negócios, otimize processos e tome decisões estratégicas.',
        education: 'Administração',
        growth: 'Estável',
        salary: 'Kz 280.000 - Kz 1.200.000+'
      },
      {
        title: 'Analista de Marketing Digital',
        description: 'Desenvolva estratégias para promover produtos e conquistar clientes online.',
        education: 'Marketing, Publicidade, Administração',
        growth: 'Muito Alto',
        salary: 'Kz 300.000 - Kz 1.400.000+'
      },
      {
        title: 'Gestor de Projetos',
        description: 'Planeje, execute e entregue projetos complexos no prazo e orçamento.',
        education: 'Administração, Engenharia, Certificações PMP/Scrum',
        growth: 'Alto',
        salary: 'Kz 400.000 - Kz 1.600.000+'
      },
      {
        title: 'Analista Financeiro',
        description: 'Analise investimentos, gerencie riscos e otimize recursos financeiros.',
        education: 'Economia, Finanças, Administração',
        growth: 'Alto',
        salary: 'Kz 380.000 - Kz 1.500.000+'
      },
      {
        title: 'Product Manager',
        description: 'Lidere o desenvolvimento de produtos do conceito ao lançamento.',
        education: 'Administração, Engenharia, cursos de Product Management',
        growth: 'Explosivo - papel essencial em tech',
        salary: 'Kz 550.000 - Kz 2.200.000+'
      },
      {
        title: 'Consultor Empresarial',
        description: 'Assessore empresas em estratégia, processos e transformação organizacional.',
        education: 'Administração, Economia, MBA',
        growth: 'Alto - consultoria valorizada',
        salary: 'Kz 450.000 - Kz 2.500.000+'
      },
      {
        title: 'Analista de Recursos Humanos',
        description: 'Gerencie talentos, recrutamento e desenvolvimento de pessoas.',
        education: 'Recursos Humanos, Psicologia, Administração',
        growth: 'Médio a Alto',
        salary: 'Kz 280.000 - Kz 1.100.000+'
      },
      {
        title: 'Contador',
        description: 'Gerencie finanças, impostos e relatórios contábeis de organizações.',
        education: 'Contabilidade, Ciências Contábeis',
        growth: 'Estável - sempre necessário',
        salary: 'Kz 300.000 - Kz 1.200.000+'
      }
    ]
  },
  Engenharia: {
    careers: [
      {
        title: 'Engenheiro Civil',
        description: 'Projete e execute obras de infraestrutura e construções.',
        education: 'Engenharia Civil (5 anos)',
        growth: 'Médio a Alto',
        salary: 'Kz 400.000 - Kz 1.600.000+'
      },
      {
        title: 'Engenheiro de Produção',
        description: 'Otimize processos produtivos e aumente a eficiência empresarial.',
        education: 'Engenharia de Produção',
        growth: 'Alto',
        salary: 'Kz 400.000 - Kz 1.400.000+'
      },
      {
        title: 'Engenheiro Mecânico',
        description: 'Projete máquinas, sistemas mecânicos e soluções industriais.',
        education: 'Engenharia Mecânica (5 anos)',
        growth: 'Médio',
        salary: 'Kz 380.000 - Kz 1.500.000+'
      },
      {
        title: 'Engenheiro Elétrico/Eletrônico',
        description: 'Desenvolva sistemas elétricos, eletrônicos e de automação.',
        education: 'Engenharia Elétrica/Eletrônica',
        growth: 'Alto',
        salary: 'Kz 420.000 - Kz 1.700.000+'
      },
      {
        title: 'Engenheiro de Petróleo e Gás',
        description: 'Trabalhe na exploração e produção de petróleo e gás natural.',
        education: 'Engenharia de Petróleo e Gás (5 anos)',
        growth: 'Médio - dependente do setor energético',
        salary: 'Kz 600.000 - Kz 3.500.000+'
      },
      {
        title: 'Engenheiro de Minas',
        description: 'Gerencie extração de minérios e recursos minerais com sustentabilidade.',
        education: 'Engenharia de Minas (5 anos)',
        growth: 'Médio - setor mineral importante em Angola',
        salary: 'Kz 500.000 - Kz 2.200.000+'
      },
      {
        title: 'Arquiteto',
        description: 'Projete edificações, interiores e espaços urbanos criativos e funcionais.',
        education: 'Arquitetura e Urbanismo (5 anos)',
        growth: 'Médio',
        salary: 'Kz 350.000 - Kz 1.600.000+'
      }
    ]
  },
  Direito: {
    careers: [
      {
        title: 'Advogado',
        description: 'Defenda direitos, atue em diversas áreas jurídicas e faça justiça.',
        education: 'Direito (5 anos) + OAB',
        growth: 'Médio',
        salary: 'Kz 240.000 - Kz 2.400.000+'
      },
      {
        title: 'Advogado Empresarial',
        description: 'Assessore empresas em questões legais e contratos corporativos.',
        education: 'Direito + Especialização Empresarial',
        growth: 'Alto',
        salary: 'Kz 450.000 - Kz 2.800.000+'
      },
      {
        title: 'Promotor de Justiça',
        description: 'Atue no Ministério Público defendendo direitos da sociedade.',
        education: 'Direito + Concurso Público',
        growth: 'Estável - carreira pública',
        salary: 'Kz 500.000 - Kz 2.000.000+'
      },
      {
        title: 'Juiz de Direito',
        description: 'Julgue casos e aplique a lei com imparcialidade e justiça.',
        education: 'Direito + Concurso para Magistratura',
        growth: 'Estável - carreira pública de prestígio',
        salary: 'Kz 800.000 - Kz 3.000.000+'
      },
      {
        title: 'Advogado Trabalhista',
        description: 'Especialize-se em relações de trabalho e direitos dos trabalhadores.',
        education: 'Direito + Especialização Trabalhista',
        growth: 'Médio',
        salary: 'Kz 300.000 - Kz 1.500.000+'
      }
    ]
  },
  Comunicação: {
    careers: [
      {
        title: 'Jornalista',
        description: 'Investigue, apure e comunique informações relevantes para a sociedade.',
        education: 'Jornalismo',
        growth: 'Médio',
        salary: 'Kz 220.000 - Kz 900.000+'
      },
      {
        title: 'Relações Públicas',
        description: 'Gerencie a imagem e comunicação de empresas e personalidades.',
        education: 'Relações Públicas, Comunicação',
        growth: 'Médio a Alto',
        salary: 'Kz 280.000 - Kz 1.100.000+'
      },
      {
        title: 'Social Media Manager',
        description: 'Gerencie estratégias de conteúdo e presença digital de marcas.',
        education: 'Comunicação, Marketing, cursos especializados',
        growth: 'Muito Alto',
        salary: 'Kz 300.000 - Kz 1.200.000+'
      },
      {
        title: 'Produtor de Conteúdo / Criador Digital',
        description: 'Crie conteúdo para redes sociais, YouTube, podcasts e plataformas digitais.',
        education: 'Comunicação, Jornalismo, Marketing - ou autodidata',
        growth: 'Explosivo - economia dos criadores',
        salary: 'Kz 200.000 - Kz 2.500.000+'
      },
      {
        title: 'Assessor de Imprensa',
        description: 'Gerencie relacionamento com mídias e comunicação estratégica.',
        education: 'Jornalismo, Relações Públicas',
        growth: 'Médio',
        salary: 'Kz 280.000 - Kz 1.000.000+'
      },
      {
        title: 'Publicitário',
        description: 'Desenvolva campanhas criativas para promover marcas e produtos.',
        education: 'Publicidade e Propaganda',
        growth: 'Médio a Alto',
        salary: 'Kz 300.000 - Kz 1.400.000+'
      }
    ]
  },
  Ciências: {
    careers: [
      {
        title: 'Biólogo',
        description: 'Estude a vida em todas as suas formas e contribua para descobertas.',
        education: 'Biologia',
        growth: 'Médio',
        salary: 'Kz 250.000 - Kz 900.000+'
      },
      {
        title: 'Químico',
        description: 'Pesquise e desenvolva novos materiais, medicamentos e substâncias.',
        education: 'Química',
        growth: 'Médio',
        salary: 'Kz 280.000 - Kz 1.000.000+'
      },
      {
        title: 'Físico / Pesquisador',
        description: 'Estude leis da natureza e desenvolva tecnologias inovadoras.',
        education: 'Física (Bacharelado ou Licenciatura)',
        growth: 'Médio - pesquisa acadêmica',
        salary: 'Kz 280.000 - Kz 1.200.000+'
      },
      {
        title: 'Matemático / Estatístico',
        description: 'Aplique matemática avançada em ciência de dados, finanças e pesquisa.',
        education: 'Matemática, Estatística',
        growth: 'Alto - era dos dados',
        salary: 'Kz 350.000 - Kz 1.600.000+'
      },
      {
        title: 'Biomédico',
        description: 'Realize análises clínicas e pesquisas na área biomédica.',
        education: 'Biomedicina (4-5 anos)',
        growth: 'Alto - saúde diagnóstica',
        salary: 'Kz 300.000 - Kz 1.100.000+'
      }
    ]
  },
  Ambiente: {
    careers: [
      {
        title: 'Engenheiro Ambiental',
        description: 'Desenvolva soluções sustentáveis e preserve o meio ambiente.',
        education: 'Engenharia Ambiental',
        growth: 'Alto - sustentabilidade crescente',
        salary: 'Kz 350.000 - Kz 1.300.000+'
      },
      {
        title: 'Biólogo Ambiental',
        description: 'Estude ecossistemas e desenvolva projetos de conservação.',
        education: 'Biologia com foco em Meio Ambiente',
        growth: 'Médio a Alto',
        salary: 'Kz 280.000 - Kz 950.000+'
      },
      {
        title: 'Gestor Ambiental',
        description: 'Gerencie recursos naturais e programas de sustentabilidade corporativa.',
        education: 'Gestão Ambiental, Administração Ambiental',
        growth: 'Alto - empresas investindo em ESG',
        salary: 'Kz 320.000 - Kz 1.200.000+'
      },
      {
        title: 'Especialista em Energias Renováveis',
        description: 'Desenvolva projetos de energia solar, eólica e outras fontes limpas.',
        education: 'Engenharia de Energia, Engenharia Elétrica',
        growth: 'Muito Alto - transição energética',
        salary: 'Kz 400.000 - Kz 1.600.000+'
      }
    ]
  },
  Esportes: {
    careers: [
      {
        title: 'Educador Físico',
        description: 'Promova saúde através do exercício e atividades físicas.',
        education: 'Educação Física',
        growth: 'Alto - conscientização sobre saúde',
        salary: 'Kz 220.000 - Kz 850.000+'
      },
      {
        title: 'Preparador Físico / Personal Trainer',
        description: 'Treine atletas e pessoas em busca de condicionamento físico.',
        education: 'Educação Física, Certificações específicas',
        growth: 'Muito Alto - mercado fitness em expansão',
        salary: 'Kz 250.000 - Kz 1.200.000+'
      },
      {
        title: 'Fisioterapeuta Esportivo',
        description: 'Cuide da recuperação e prevenção de lesões em atletas.',
        education: 'Fisioterapia com especialização esportiva',
        growth: 'Alto',
        salary: 'Kz 350.000 - Kz 1.400.000+'
      },
      {
        title: 'Nutricionista Esportivo',
        description: 'Elabore planos alimentares para performance atlética.',
        education: 'Nutrição com especialização esportiva',
        growth: 'Alto',
        salary: 'Kz 300.000 - Kz 1.100.000+'
      },
      {
        title: 'Gestor Esportivo',
        description: 'Administre clubes, eventos e projetos esportivos.',
        education: 'Administração Esportiva, Gestão do Esporte',
        growth: 'Médio a Alto',
        salary: 'Kz 320.000 - Kz 1.500.000+'
      }
    ]
  },
  Culinária: {
    careers: [
      {
        title: 'Chef de Cozinha',
        description: 'Crie pratos incríveis e lidere equipes em cozinhas profissionais.',
        education: 'Gastronomia, Cursos de culinária profissional',
        growth: 'Alto - cultura gastronômica crescendo',
        salary: 'Kz 280.000 - Kz 1.800.000+'
      },
      {
        title: 'Confeiteiro / Pâtissier',
        description: 'Especialize-se em doces, bolos e sobremesas de alta qualidade.',
        education: 'Confeitaria, Gastronomia',
        growth: 'Alto - mercado de confeitaria artesanal',
        salary: 'Kz 220.000 - Kz 1.200.000+'
      },
      {
        title: 'Nutricionista',
        description: 'Oriente sobre alimentação saudável e elabore dietas personalizadas.',
        education: 'Nutrição (5 anos)',
        growth: 'Muito Alto - preocupação com saúde',
        salary: 'Kz 280.000 - Kz 1.000.000+'
      },
      {
        title: 'Consultor Gastronômico',
        description: 'Assessore restaurantes no desenvolvimento de cardápios e processos.',
        education: 'Gastronomia, experiência comprovada',
        growth: 'Médio a Alto',
        salary: 'Kz 350.000 - Kz 1.500.000+'
      },
      {
        title: 'Food Stylist',
        description: 'Crie apresentações visuais de alimentos para mídia e publicidade.',
        education: 'Gastronomia, Design, Fotografia',
        growth: 'Alto - conteúdo gastronômico em alta',
        salary: 'Kz 300.000 - Kz 1.300.000+'
      }
    ]
  }
};

export async function generateCareerRecommendation(formData: CareerFormData): Promise<CareerRecommendation> {
  // Simular delay de processamento
  await new Promise(resolve => setTimeout(resolve, 2500));

  const topCareers: CareerRecommendation['topCareers'] = [];
  
  // Selecionar carreiras baseadas nos interesses
  formData.interests.forEach(interest => {
    if (careerDatabase[interest]) {
      topCareers.push(...careerDatabase[interest].careers);
    }
  });

  // Análise inteligente de hobbies
  if (formData.hobbies) {
    const hobbiesLower = formData.hobbies.toLowerCase();
    if (hobbiesLower.includes('programar') || hobbiesLower.includes('código') || hobbiesLower.includes('tecnologia')) {
      topCareers.push(...careerDatabase.Tecnologia.careers.slice(0, 2));
    }
    if (hobbiesLower.includes('desenhar') || hobbiesLower.includes('arte') || hobbiesLower.includes('design')) {
      topCareers.push(...careerDatabase['Arte e Design'].careers.slice(0, 2));
    }
    if (hobbiesLower.includes('gaming') || hobbiesLower.includes('jogos') || hobbiesLower.includes('videogame')) {
      topCareers.push(careerDatabase.Tecnologia.careers[0]);
      topCareers.push(careerDatabase['Arte e Design'].careers[2]);
    }
    if (hobbiesLower.includes('rede') || hobbiesLower.includes('server') || hobbiesLower.includes('infraestrutura')) {
      topCareers.push(...careerDatabase['Redes e Infraestrutura'].careers);
    }
    if (hobbiesLower.includes('segurança') || hobbiesLower.includes('hacker') || hobbiesLower.includes('proteção')) {
      topCareers.push(...careerDatabase.Cibersegurança.careers.slice(0, 2));
    }
  }

  // Se não encontrou carreiras ou encontrou poucas, adicionar baseadas em personalidade
  if (topCareers.length < 2) {
    if (formData.personalityType === 'analitico') {
      topCareers.push(careerDatabase.Tecnologia.careers[1]); // Data Scientist
      topCareers.push(careerDatabase['Redes e Infraestrutura'].careers[2]); // Cloud Architect
    }
    if (formData.personalityType === 'criativo') {
      topCareers.push(careerDatabase['Arte e Design'].careers[0]); // Designer
    }
    if (formData.personalityType === 'social') {
      topCareers.push(careerDatabase.Educação.careers[0]); // Professor
    }
    if (formData.personalityType === 'empreendedor') {
      topCareers.push(careerDatabase.Negócios.careers[4]); // Product Manager
    }
  }

  // Limitar a 3-4 carreiras principais
  const finalCareers = topCareers.slice(0, 4);

  // Gerar cursos recomendados
  const courses: string[] = [];
  const uniqueEducation = new Set<string>();
  
  finalCareers.forEach(career => {
    const educationOptions = career.education.split(',');
    educationOptions.forEach(edu => {
      const trimmed = edu.trim();
      if (trimmed && !uniqueEducation.has(trimmed)) {
        uniqueEducation.add(trimmed);
        courses.push(trimmed);
      }
    });
  });

  // Adicionar cursos complementares baseados em interesses
  if (formData.interests.includes('Tecnologia')) {
    courses.push('Cursos de programação (Python, JavaScript, Java)');
    courses.push('Certificações em Cloud Computing (AWS, Azure, Google Cloud)');
  }
  if (formData.interests.includes('Redes e Infraestrutura')) {
    courses.push('Certificações Cisco (CCNA, CCNP, CCIE)');
    courses.push('Certificações em virtualização (VMware, Hyper-V)');
    courses.push('Cursos de Kubernetes e Docker');
    courses.push('Certificações Linux (LPIC, Red Hat)');
  }
  if (formData.interests.includes('Cibersegurança')) {
    courses.push('Certificações de Segurança (CEH, CISSP, CompTIA Security+)');
    courses.push('Cursos de Ethical Hacking e Penetration Testing');
    courses.push('Especialização em Forense Digital');
  }
  if (formData.interests.includes('Comunicação')) {
    courses.push('Cursos de oratória e comunicação eficaz');
    courses.push('Marketing Digital e Mídias Sociais');
  }

  // Gerar habilidades a desenvolver
  const skills: string[] = [];
  
  if (formData.skills.includes('Criatividade')) {
    skills.push('Design Thinking e metodologias criativas');
    skills.push('Inovação e pensamento disruptivo');
  }
  if (formData.skills.includes('Lógica')) {
    skills.push('Raciocínio lógico e resolução de problemas complexos');
    skills.push('Pensamento algorítmico');
  }
  if (formData.skills.includes('Comunicação')) {
    skills.push('Comunicação assertiva e persuasiva');
    skills.push('Apresentações impactantes');
  }
  if (formData.skills.includes('Liderança')) {
    skills.push('Gestão de equipes e liderança transformacional');
    skills.push('Tomada de decisões estratégicas');
  }
  
  skills.push('Inglês avançado (diferencial em qualquer carreira)');
  skills.push('Gestão de tempo e produtividade');
  skills.push('Inteligência emocional e resiliência');
  skills.push('Networking e relacionamento profissional');
  skills.push('Aprendizado contínuo e adaptabilidade');

  // Gerar roadmap personalizado
  const roadmap: string[] = [];
  
  if (formData.currentLevel === 'fundamental' || formData.currentLevel === 'medio') {
    roadmap.push('Foque em concluir o ensino médio com boas notas');
    roadmap.push('Participe de atividades extracurriculares relacionadas às suas áreas de interesse');
    roadmap.push('Comece a desenvolver habilidades através de cursos online gratuitos');
    roadmap.push('Pesquise sobre as profissões e converse com profissionais da área');
    roadmap.push('Prepare-se para o ENEM e vestibulares das universidades desejadas');
    roadmap.push('Construa um portfólio pessoal (projetos, trabalhos, conquistas)');
  } else if (formData.currentLevel === 'medio-completo') {
    roadmap.push('Escolha o curso superior alinhado com suas carreiras de interesse');
    roadmap.push('Pesquise universidades, grade curricular e reputação no mercado');
    roadmap.push('Considere programas de bolsas de estudo e financiamento estudantil');
    roadmap.push('Enquanto estuda, faça cursos complementares online');
    roadmap.push('Busque estágios desde o início da graduação');
    roadmap.push('Participe de grupos de estudo e eventos da área');
  } else {
    roadmap.push('Avalie especializações e pós-graduações na sua área de interesse');
    roadmap.push('Construa um portfólio ou currículo destacando suas experiências');
    roadmap.push('Desenvolva networking através de eventos e plataformas profissionais');
    roadmap.push('Busque mentorias com profissionais experientes da área');
    roadmap.push('Mantenha-se atualizado com tendências do mercado');
    roadmap.push('Considere certificações internacionais relevantes');
  }

  // Oportunidades de mercado
  const opportunities: string[] = [
    'Mercado aquecido para profissionais qualificados e atualizados',
    'Possibilidade de trabalho remoto em diversas áreas',
    'Crescimento de startups e empresas inovadoras em Angola e no mundo',
    'Demanda por profissionais que combinam habilidades técnicas e soft skills',
    'Oportunidades de empreendedorismo e trabalho autônomo'
  ];

  if (formData.interests.includes('Tecnologia')) {
    opportunities.push('Tecnologia é uma das áreas com maior crescimento global');
    opportunities.push('Empresas tech pagam os melhores salários do mercado');
  }
  if (formData.interests.includes('Redes e Infraestrutura')) {
    opportunities.push('Infraestrutura de TI é crítica para todas as empresas');
    opportunities.push('Migração para cloud computing abrindo milhares de vagas');
    opportunities.push('Profissionais de redes sempre em demanda');
  }
  if (formData.interests.includes('Cibersegurança')) {
    opportunities.push('Cibersegurança: uma das áreas com MAIOR escassez de profissionais');
    opportunities.push('Ameaças crescentes aumentam investimentos em segurança');
  }
  if (formData.interests.includes('Saúde')) {
    opportunities.push('Área da saúde sempre tem demanda, especialmente pós-pandemia');
  }

  // Mensagem motivacional personalizada
  let motivation = `Parabéns por investir tempo em planejar seu futuro profissional, ${formData.userName || 'futuro profissional'}! `;
  
  const careerTitles = finalCareers.map(c => c.title).join(', ');
  motivation += `Com base na análise inteligente do seu perfil, identificamos que você tem grande potencial para carreiras como ${careerTitles}. `;
  
  if (formData.personalityType === 'criativo') {
    motivation += `Sua criatividade é um diferencial valioso no mercado atual. Carreiras que valorizam inovação são perfeitas para você. `;
  } else if (formData.personalityType === 'analitico') {
    motivation += `Seu perfil analítico é altamente valorizado em carreiras estratégicas e tecnológicas. Você tem potencial para se destacar. `;
  } else if (formData.personalityType === 'social') {
    motivation += `Sua habilidade com pessoas abre portas em diversas profissões. O mercado valoriza muito inteligência emocional. `;
  } else if (formData.personalityType === 'empreendedor') {
    motivation += `Seu espírito empreendedor pode levá-lo a criar o próximo grande negócio. O mundo precisa de inovadores como você. `;
  }
  
  if (formData.hobbies) {
    motivation += `Seus hobbies (${formData.hobbies}) revelam paixões que podem se transformar em carreiras incríveis. `;
  }
  
  motivation += `Lembre-se: o sucesso profissional vem da combinação entre paixão, dedicação e aprendizado contínuo. Você está no caminho certo para um futuro brilhante!`;

  // Gerar caminhos específicos por carreira usando o mapeamento detalhado
  const specificCareerPaths: CareerRecommendation['specificCareerPaths'] = finalCareers.map(career => {
    const careerMapping = getCareerCourses(career.title);
    
    if (careerMapping) {
      return {
        career: career.title,
        requiredCourses: careerMapping.required,
        complementaryCourses: careerMapping.complementary
      };
    }
    
    // Fallback caso não exista mapeamento
    return {
      career: career.title,
      requiredCourses: [career.education],
      complementaryCourses: ['Cursos e formações específicas para esta área']
    };
  });

  return {
    topCareers: finalCareers,
    courses,
    specificCareerPaths,
    skills,
    roadmap,
    opportunities,
    motivation
  };
}
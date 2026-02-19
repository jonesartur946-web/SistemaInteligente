// Mapeamento específico de cursos para cada carreira
// Para se tornar X, você precisa cursar Y, Z

export interface CareerCourseMapping {
  required: string[]; // Cursos obrigatórios
  complementary: string[]; // Cursos complementares
}

export const careerCoursesMap: Record<string, CareerCourseMapping> = {
  // ===== TECNOLOGIA =====
  'Desenvolvedor de Software': {
    required: ['Ciência da Computação', 'Engenharia de Software', 'Sistemas de Informação'],
    complementary: ['Bootcamps de Programação (Alura, Rocketseat)', 'Curso de Python', 'Curso de JavaScript/React', 'Git e GitHub']
  },
  'Analista de Dados / Data Scientist': {
    required: ['Estatística', 'Ciência de Dados', 'Matemática Aplicada'],
    complementary: ['Python para Data Science', 'SQL e Bancos de Dados', 'Machine Learning', 'Power BI / Tableau', 'R Programming']
  },
  'Engenheiro de Machine Learning': {
    required: ['Ciência da Computação', 'Engenharia da Computação', 'Inteligência Artificial'],
    complementary: ['Deep Learning Specialization', 'TensorFlow / PyTorch', 'Matemática para IA', 'Cloud AI (AWS/Google Cloud)']
  },
  'Desenvolvedor Mobile': {
    required: ['Ciência da Computação', 'Engenharia de Software', 'Desenvolvimento Mobile'],
    complementary: ['React Native', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)', 'Firebase']
  },
  'Desenvolvedor Full Stack': {
    required: ['Ciência da Computação', 'Engenharia de Software', 'Bootcamps Full Stack'],
    complementary: ['Node.js/Express', 'React/Vue/Angular', 'Bancos de Dados (SQL e NoSQL)', 'DevOps Básico', 'APIs REST']
  },
  'Arquiteto de Software': {
    required: ['Engenharia de Software', 'Ciência da Computação + Experiência Sênior (5+ anos)'],
    complementary: ['Padrões de Projeto (Design Patterns)', 'Arquitetura de Microsserviços', 'Cloud Architecture', 'Domain-Driven Design']
  },
  'Engenheiro de Blockchain': {
    required: ['Ciência da Computação', 'Engenharia de Software'],
    complementary: ['Blockchain Development', 'Solidity/Smart Contracts', 'Criptografia', 'Web3.js/Ethers.js', 'DeFi Fundamentals']
  },

  // ===== REDES E INFRAESTRUTURA =====
  'Engenheiro de Redes': {
    required: ['Redes de Computadores', 'Engenharia de Telecomunicações', 'Sistemas de Informação'],
    complementary: ['Certificação CCNA (Cisco)', 'Certificação CCNP (Cisco)', 'Roteamento e Switching', 'Protocolos de Rede (TCP/IP)']
  },
  'Administrador de Sistemas': {
    required: ['Administração de Redes', 'Sistemas de Informação', 'Tecnologia da Informação'],
    complementary: ['Certificação Linux (LPIC-1, LPIC-2)', 'Certificação Windows Server (MCSA)', 'Shell Scripting', 'Virtualização VMware/Hyper-V']
  },
  'Arquiteto de Soluções Cloud': {
    required: ['Ciência da Computação', 'Engenharia de Software', 'Sistemas de Informação'],
    complementary: ['AWS Solutions Architect', 'Azure Solutions Architect', 'Google Cloud Architect', 'Terraform', 'Kubernetes']
  },
  'Especialista em DevOps': {
    required: ['Engenharia de Software', 'Administração de Redes', 'Ciência da Computação'],
    complementary: ['Docker', 'Kubernetes', 'CI/CD (Jenkins, GitLab CI)', 'Ansible/Puppet', 'Monitoramento (Prometheus/Grafana)']
  },
  'Engenheiro de Infraestrutura de TI': {
    required: ['Infraestrutura de TI', 'Redes de Computadores', 'Sistemas de Informação'],
    complementary: ['Certificação VMware VCP', 'Certificação Cisco CCNP', 'Data Center Management', 'Storage Solutions']
  },
  'Especialista em Redes Sem Fio': {
    required: ['Telecomunicações', 'Redes de Computadores', 'Engenharia de Telecomunicações'],
    complementary: ['Certificação CWNA (Wireless)', 'Tecnologias 5G', 'Wi-Fi 6/6E', 'RF Planning and Design']
  },

  // ===== CIBERSEGURANÇA =====
  'Analista de Segurança da Informação': {
    required: ['Segurança da Informação', 'Ciência da Computação', 'Sistemas de Informação'],
    complementary: ['Certificação CompTIA Security+', 'Certificação CEH (Ethical Hacker)', 'SIEM Tools', 'Análise de Vulnerabilidades']
  },
  'Especialista em Ethical Hacking': {
    required: ['Segurança Cibernética', 'Ciência da Computação'],
    complementary: ['Certificação CEH (Certified Ethical Hacker)', 'Certificação OSCP (Offensive Security)', 'Penetration Testing', 'Metasploit / Burp Suite']
  },
  'Arquiteto de Segurança': {
    required: ['Arquitetura de Segurança', 'Engenharia de Software', 'Segurança da Informação + Experiência'],
    complementary: ['Certificação CISSP', 'Certificação CISM', 'Zero Trust Architecture', 'Security by Design']
  },
  'Analista de SOC (Security Operations Center)': {
    required: ['Segurança Cibernética', 'Ciência da Computação'],
    complementary: ['Análise de Logs (SIEM)', 'Incident Response', 'Threat Hunting', 'Certificação Blue Team Level 1']
  },

  // ===== SAÚDE =====
  'Médico': {
    required: ['Medicina (6 anos)', 'Residência Médica (2-5 anos dependendo da especialização)'],
    complementary: ['Cursos de Primeiros Socorros Avançados', 'Cursos de Especialização Médica', 'Congressos Médicos', 'Atualização em Protocolos Clínicos']
  },
  'Enfermeiro': {
    required: ['Enfermagem (5 anos)'],
    complementary: ['Pós-Graduação em Enfermagem do Trabalho', 'UTI e Emergências', 'Gestão em Saúde', 'Enfermagem Obstétrica']
  },
  'Fisioterapeuta': {
    required: ['Fisioterapia (5 anos)'],
    complementary: ['Fisioterapia Esportiva', 'Fisioterapia Neurológica', 'Pilates Clínico', 'Osteopatia']
  },
  'Farmacêutico': {
    required: ['Farmácia (5 anos)'],
    complementary: ['Farmácia Clínica', 'Farmacologia Avançada', 'Gestão Farmacêutica', 'Atenção Farmacêutica']
  },
  'Dentista / Odontologista': {
    required: ['Odontologia (5 anos)'],
    complementary: ['Especialização em Ortodontia', 'Implantodontia', 'Estética Dental', 'Endodontia']
  },
  'Dermatologista': {
    required: ['Medicina (6 anos)', 'Residência em Dermatologia (3 anos)'],
    complementary: ['Dermatologia Estética', 'Procedimentos Estéticos Avançados', 'Laser em Dermatologia', 'Tricologia']
  },
  'Técnico de Análises Clínicas': {
    required: ['Análises Clínicas (3-4 anos)', 'Biomedicina', 'Curso Técnico em Análises Clínicas'],
    complementary: ['Hematologia Clínica', 'Microbiologia Clínica', 'Bioquímica Clínica', 'Gestão Laboratorial']
  },
  'Especialista em Saúde Pública': {
    required: ['Saúde Pública', 'Medicina + Especialização', 'Enfermagem + Especialização'],
    complementary: ['Epidemiologia', 'Gestão em Saúde Pública', 'Políticas Públicas de Saúde', 'Vigilância Sanitária']
  },
  'Biomédico': {
    required: ['Biomedicina (4-5 anos)'],
    complementary: ['Análises Clínicas', 'Biologia Molecular', 'Genética', 'Imagenologia', 'Pesquisa Biomédica']
  },
  'Analista Clínico': {
    required: ['Biomedicina', 'Análises Clínicas (3-4 anos)', 'Farmácia-Bioquímica'],
    complementary: ['Hematologia Clínica Avançada', 'Bioquímica Clínica', 'Microbiologia e Parasitologia', 'Imunologia Clínica', 'Gestão de Laboratório', 'Controle de Qualidade Laboratorial']
  },

  // ===== EDUCAÇÃO =====
  'Professor / Educador': {
    required: ['Licenciatura na área de interesse (Matemática, Português, História, etc.)'],
    complementary: ['Metodologias Ativas de Ensino', 'Tecnologias Educacionais', 'Psicologia da Educação', 'Gestão de Sala de Aula']
  },
  'Pedagogo': {
    required: ['Pedagogia'],
    complementary: ['Psicopedagogia', 'Gestão Escolar', 'Educação Inclusiva', 'Alfabetização e Letramento']
  },
  'Designer Instrucional': {
    required: ['Pedagogia', 'Design Instrucional', 'Tecnologias Educacionais'],
    complementary: ['LMS (Moodle, Canvas)', 'Produção de Conteúdo E-learning', 'SCORM', 'Gamificação na Educação']
  },
  'Psicopedagogo': {
    required: ['Psicopedagogia', 'Pedagogia + Pós em Psicopedagogia'],
    complementary: ['Neuropsicologia', 'Distúrbios de Aprendizagem', 'Avaliação Psicopedagógica', 'Intervenção Psicopedagógica']
  },
  'Coordenador Pedagógico': {
    required: ['Pedagogia', 'Licenciatura + Experiência Docente'],
    complementary: ['Gestão Escolar', 'Liderança Educacional', 'Currículo e Avaliação', 'Formação de Professores']
  },
  'Professor de Educação Especial': {
    required: ['Pedagogia', 'Licenciatura + Especialização em Educação Especial'],
    complementary: ['Libras', 'Braille', 'Tecnologias Assistivas', 'ABA (Applied Behavior Analysis)']
  },

  // ===== ARTE E DESIGN =====
  'Designer UX/UI': {
    required: ['Design', 'Design Digital', 'Design de Interação'],
    complementary: ['Figma', 'Adobe XD', 'Pesquisa com Usuários (UX Research)', 'Prototipação', 'Design System']
  },
  'Designer Gráfico': {
    required: ['Design Gráfico', 'Comunicação Visual'],
    complementary: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Tipografia', 'Branding']
  },
  'Motion Designer': {
    required: ['Design', 'Animação', 'Cinema e Vídeo'],
    complementary: ['After Effects', 'Cinema 4D', 'Blender', 'Animação 2D/3D', 'Motion Graphics']
  },
  'Diretor de Arte': {
    required: ['Design', 'Publicidade', 'Experiência comprovada em projetos criativos'],
    complementary: ['Direção Criativa', 'Gestão de Equipes Criativas', 'Branding Estratégico', 'Fotografia']
  },
  'Ilustrador Digital': {
    required: ['Design', 'Artes Visuais', 'Cursos de Ilustração'],
    complementary: ['Procreate', 'Adobe Illustrator', 'Photoshop Digital Painting', 'Concept Art', 'Character Design']
  },
  'Designer de Produto': {
    required: ['Design de Produto', 'Design Industrial'],
    complementary: ['CAD (SolidWorks, AutoCAD)', 'Prototipagem Rápida', 'UX para Produtos Físicos', 'Materiais e Processos']
  },
  'Fotógrafo Profissional': {
    required: ['Fotografia', 'Artes Visuais', 'Cursos Técnicos de Fotografia'],
    complementary: ['Adobe Lightroom', 'Adobe Photoshop', 'Iluminação Fotográfica', 'Edição Profissional', 'Marketing para Fotógrafos']
  },

  // ===== NEGÓCIOS =====
  'Administrador de Empresas': {
    required: ['Administração de Empresas'],
    complementary: ['MBA Executivo', 'Gestão Estratégica', 'Finanças Empresariais', 'Marketing']
  },
  'Analista de Marketing Digital': {
    required: ['Marketing', 'Publicidade', 'Administração', 'Comunicação'],
    complementary: ['Google Ads', 'Facebook Ads', 'SEO/SEM', 'Google Analytics', 'Growth Hacking', 'Inbound Marketing']
  },
  'Gestor de Projetos': {
    required: ['Administração', 'Engenharia', 'Gestão de Projetos'],
    complementary: ['Certificação PMP', 'Certificação CAPM', 'Scrum Master (CSM)', 'Metodologias Ágeis', 'MS Project']
  },
  'Analista Financeiro': {
    required: ['Economia', 'Ciências Contábeis', 'Administração'],
    complementary: ['CFA (Chartered Financial Analyst)', 'Análise de Investimentos', 'Excel Avançado', 'Power BI', 'Valuation']
  },
  'Product Manager': {
    required: ['Administração', 'Engenharia', 'Ciência da Computação'],
    complementary: ['Product Management Courses', 'Lean Startup', 'User Research', 'Product Analytics', 'OKRs']
  },
  'Consultor Empresarial': {
    required: ['Administração', 'Economia', 'MBA'],
    complementary: ['Estratégia Empresarial', 'Change Management', 'Business Intelligence', 'Análise SWOT']
  },
  'Analista de Recursos Humanos': {
    required: ['Recursos Humanos', 'Psicologia Organizacional', 'Administração'],
    complementary: ['Recrutamento e Seleção', 'Treinamento e Desenvolvimento', 'Avaliação de Desempenho', 'People Analytics']
  },
  'Contador': {
    required: ['Ciências Contábeis', 'Contabilidade'],
    complementary: ['Perícia Contábil', 'Auditoria', 'Contabilidade Fiscal', 'IFRS (Normas Internacionais)']
  },

  // ===== ENGENHARIA =====
  'Engenheiro Civil': {
    required: ['Engenharia Civil (5 anos)'],
    complementary: ['AutoCAD', 'Revit (BIM)', 'Gestão de Obras', 'Estruturas', 'Geotecnia']
  },
  'Engenheiro de Produção': {
    required: ['Engenharia de Produção'],
    complementary: ['Lean Manufacturing', 'Six Sigma', 'Logística', 'Gestão da Qualidade', 'PCP (Planejamento e Controle da Produção)']
  },
  'Engenheiro Mecânico': {
    required: ['Engenharia Mecânica (5 anos)'],
    complementary: ['AutoCAD Mecânico', 'SolidWorks', 'ANSYS (Simulação)', 'Termodinâmica Aplicada', 'Manutenção Industrial']
  },
  'Engenheiro Elétrico/Eletrônico': {
    required: ['Engenharia Elétrica', 'Engenharia Eletrônica'],
    complementary: ['Automação Industrial', 'Sistemas Embarcados', 'Energia Renovável', 'Eletrônica de Potência']
  },
  'Engenheiro de Petróleo e Gás': {
    required: ['Engenharia de Petróleo e Gás (5 anos)'],
    complementary: ['Exploração e Produção', 'Engenharia de Reservatórios', 'Perfuração de Poços', 'HSE (Health, Safety, Environment)']
  },
  'Engenheiro de Minas': {
    required: ['Engenharia de Minas (5 anos)'],
    complementary: ['Lavra de Minas', 'Tratamento de Minérios', 'Geologia de Minas', 'Segurança em Mineração']
  },
  'Arquiteto': {
    required: ['Arquitetura e Urbanismo (5 anos)'],
    complementary: ['Revit (BIM)', 'SketchUp', '3ds Max', 'Luminotécnica', 'Paisagismo', 'Arquitetura Sustentável']
  },

  // ===== DIREITO =====
  'Advogado': {
    required: ['Direito (5 anos)', 'Aprovação no Exame da OAB'],
    complementary: ['Pós-Graduação em Direito (área de especialização)', 'Prática Jurídica', 'Oratória Jurídica']
  },
  'Advogado Empresarial': {
    required: ['Direito (5 anos) + OAB', 'Especialização em Direito Empresarial'],
    complementary: ['Contratos Empresariais', 'Direito Societário', 'M&A (Fusões e Aquisições)', 'Compliance']
  },
  'Promotor de Justiça': {
    required: ['Direito (5 anos) + OAB', 'Aprovação em Concurso Público do Ministério Público'],
    complementary: ['Direito Penal Avançado', 'Processo Penal', 'Direito Constitucional', 'Investigação Criminal']
  },
  'Juiz de Direito': {
    required: ['Direito (5 anos) + OAB + Mínimo 3 anos de prática jurídica', 'Aprovação em Concurso para Magistratura'],
    complementary: ['Direito Processual Civil', 'Direito Processual Penal', 'Hermenêutica Jurídica', 'Filosofia do Direito']
  },
  'Advogado Trabalhista': {
    required: ['Direito (5 anos) + OAB', 'Especialização em Direito do Trabalho'],
    complementary: ['Processo do Trabalho', 'Relações Sindicais', 'Direito Previdenciário', 'Advocacia Preventiva Trabalhista']
  },

  // ===== COMUNICAÇÃO =====
  'Jornalista': {
    required: ['Jornalismo'],
    complementary: ['Redação Jornalística', 'Fotojornalismo', 'Jornalismo Digital', 'Assessoria de Imprensa']
  },
  'Relações Públicas': {
    required: ['Relações Públicas', 'Comunicação Social'],
    complementary: ['Gestão de Crises', 'Comunicação Corporativa', 'Eventos Corporativos', 'Media Training']
  },
  'Social Media Manager': {
    required: ['Comunicação', 'Marketing', 'Jornalismo'],
    complementary: ['Facebook Ads', 'Instagram Marketing', 'TikTok para Negócios', 'Copywriting', 'Analytics']
  },
  'Produtor de Conteúdo / Criador Digital': {
    required: ['Comunicação', 'Jornalismo', 'Marketing (ou autodidata)'],
    complementary: ['Edição de Vídeo (Premiere, Final Cut)', 'YouTube SEO', 'Monetização de Conteúdo', 'Personal Branding']
  },
  'Assessor de Imprensa': {
    required: ['Jornalismo', 'Relações Públicas'],
    complementary: ['Media Relations', 'Press Release', 'Gestão de Crises', 'Relacionamento com Mídia']
  },
  'Publicitário': {
    required: ['Publicidade e Propaganda'],
    complementary: ['Criação Publicitária', 'Planejamento de Mídia', 'Marketing Digital', 'Branding']
  },

  // ===== CIÊNCIAS =====
  'Biólogo': {
    required: ['Biologia (Bacharelado ou Licenciatura)'],
    complementary: ['Biologia Molecular', 'Ecologia', 'Genética', 'Microbiologia']
  },
  'Químico': {
    required: ['Química (Bacharelado ou Licenciatura)'],
    complementary: ['Química Analítica', 'Química Orgânica', 'Química Industrial', 'Pesquisa e Desenvolvimento']
  },
  'Físico / Pesquisador': {
    required: ['Física (Bacharelado)', 'Mestrado/Doutorado (para pesquisa)'],
    complementary: ['Física Quântica', 'Astrofísica', 'Física de Partículas', 'Métodos Computacionais']
  },
  'Matemático / Estatístico': {
    required: ['Matemática', 'Estatística'],
    complementary: ['R / Python para Estatística', 'Modelagem Estatística', 'Data Science', 'Análise Multivariada']
  },

  // ===== AMBIENTE =====
  'Engenheiro Ambiental': {
    required: ['Engenharia Ambiental'],
    complementary: ['Gestão de Resíduos', 'Licenciamento Ambiental', 'Tratamento de Água e Esgoto', 'ISO 14001']
  },
  'Biólogo Ambiental': {
    required: ['Biologia com foco em Meio Ambiente'],
    complementary: ['Ecologia de Ecossistemas', 'Bioconservação', 'Recuperação de Áreas Degradadas', 'EIA/RIMA']
  },
  'Gestor Ambiental': {
    required: ['Gestão Ambiental', 'Administração Ambiental'],
    complementary: ['Legislação Ambiental', 'Sustentabilidade Corporativa', 'ESG', 'Economia Verde']
  },
  'Especialista em Energias Renováveis': {
    required: ['Engenharia de Energia', 'Engenharia Elétrica'],
    complementary: ['Energia Solar Fotovoltaica', 'Energia Eólica', 'Biomassa', 'Eficiência Energética']
  },

  // ===== ESPORTES =====
  'Educador Físico': {
    required: ['Educação Física (Licenciatura ou Bacharelado)'],
    complementary: ['Treinamento Esportivo', 'Avaliação Física', 'Fisiologia do Exercício']
  },
  'Preparador Físico / Personal Trainer': {
    required: ['Educação Física', 'Certificações Específicas (CREF)'],
    complementary: ['Musculação', 'Treinamento Funcional', 'CrossFit', 'Nutrição Esportiva Básica']
  },
  'Fisioterapeuta Esportivo': {
    required: ['Fisioterapia + Especialização em Fisioterapia Esportiva'],
    complementary: ['Reabilitação de Lesões Esportivas', 'Bandagens Funcionais', 'Prevenção de Lesões']
  },
  'Nutricionista Esportivo': {
    required: ['Nutrição + Especialização em Nutrição Esportiva'],
    complementary: ['Suplementação Esportiva', 'Dietética para Atletas', 'Avaliação Nutricional Esportiva']
  },
  'Gestor Esportivo': {
    required: ['Administração Esportiva', 'Gestão do Esporte'],
    complementary: ['Marketing Esportivo', 'Gestão de Eventos Esportivos', 'Direito Desportivo']
  },

  // ===== CULINÁRIA =====
  'Chef de Cozinha': {
    required: ['Gastronomia', 'Cursos de Culinária Profissional'],
    complementary: ['Cozinha Francesa', 'Cozinha Italiana', 'Gestão de Cozinhas', 'Food Cost']
  },
  'Confeiteiro / Pâtissier': {
    required: ['Confeitaria', 'Gastronomia'],
    complementary: ['Confeitaria Francesa', 'Chocolateria', 'Bolos Artísticos', 'Sobremesas Contemporâneas']
  },
  'Nutricionista': {
    required: ['Nutrição (5 anos)'],
    complementary: ['Nutrição Clínica', 'Nutrição Esportiva', 'Nutrição Estética', 'Coaching Nutricional']
  },
  'Consultor Gastronômico': {
    required: ['Gastronomia', 'Experiência comprovada em restaurantes'],
    complementary: ['Gestão de Restaurantes', 'Desenvolvimento de Cardápios', 'Food Trends', 'Custos Gastronômicos']
  },
  'Food Stylist': {
    required: ['Gastronomia', 'Design', 'Fotografia'],
    complementary: ['Fotografia de Alimentos', 'Composição Visual', 'Edição de Imagens', 'Produção de Conteúdo Gastronômico']
  }
};

// Função para obter cursos específicos para uma carreira
export function getCareerCourses(careerTitle: string): CareerCourseMapping | null {
  return careerCoursesMap[careerTitle] || null;
}

// Função para formatar a apresentação dos cursos
export function formatCareerCourses(careerTitle: string): string {
  const mapping = getCareerCourses(careerTitle);
  if (!mapping) return 'Cursos não mapeados para esta carreira.';

  let formatted = `📚 Para se tornar ${careerTitle}, você precisa:\n\n`;
  
  formatted += `✅ FORMAÇÃO OBRIGATÓRIA:\n`;
  mapping.required.forEach((course, index) => {
    formatted += `  ${index + 1}. ${course}\n`;
  });

  formatted += `\n💡 CURSOS COMPLEMENTARES (Diferenciais):\n`;
  mapping.complementary.forEach((course, index) => {
    formatted += `  ${index + 1}. ${course}\n`;
  });

  return formatted;
}
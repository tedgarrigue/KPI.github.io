import { JobOffer, SearchCriteria } from '../types';

const JOB_TITLES = [
  'Développeur Full Stack',
  'Ingénieur DevOps',
  'Data Scientist',
  'Product Manager',
  'UX/UI Designer',
  'Développeur Frontend React',
  'Développeur Backend Node.js',
  'Lead Developer',
  'Architecte Cloud',
  'Software Engineer',
  'Mobile Developer iOS',
  'Mobile Developer Android',
  'QA Engineer',
  'Scrum Master',
  'Technical Writer',
];

const COMPANIES = [
  'TechCorp France',
  'Innovate Labs',
  'Digital Solutions',
  'Cloud Systems',
  'Data Intelligence',
  'Agile Studios',
  'NextGen Tech',
  'Quantum Computing Inc',
  'AI Pioneers',
  'DevOps Masters',
  'Startup Ventures',
  'Enterprise Systems',
  'Mobile First',
  'Web Innovators',
  'IoT Solutions',
];

const LOCATIONS = [
  'Paris',
  'Lyon',
  'Toulouse',
  'Nantes',
  'Bordeaux',
  'Marseille',
  'Lille',
  'Strasbourg',
  'Rennes',
  'Nice',
  'Montpellier',
  'Grenoble',
];

const CONTRACT_TYPES: Array<JobOffer['contractType']> = [
  'CDI',
  'CDD',
  'Stage',
  'Alternance',
  'Freelance',
];

const REMOTE_OPTIONS: Array<JobOffer['remote']> = [
  'No',
  'Partial',
  'Full',
];

const EXPERIENCE_LEVELS: Array<JobOffer['experienceLevel']> = [
  'Junior',
  'Confirmé',
  'Senior',
  'Expert',
];

const SKILLS_TEXT = [
  'React, Node.js, TypeScript, PostgreSQL',
  'AWS, Docker, Kubernetes, CI/CD',
  'Python, TensorFlow, Pandas, scikit-learn',
  'Vue.js, Tailwind CSS, JavaScript ES6+',
  'Java, Spring Boot, Microservices',
  'GraphQL, MongoDB, Express.js',
  'Azure, .NET, C#, Entity Framework',
  'Angular, RxJS, Material Design',
  'Go, gRPC, Protocol Buffers',
  'Rust, WebAssembly, Performance optimization',
  'Communication skills, Team collaboration, Problem solving',
  'Leadership, Project management, Agile/Scrum',
  'FastAPI, Python, Machine Learning',
  'Flutter, Dart, Mobile Development',
  'Solidity, Blockchain, Web3',
];

const DESCRIPTIONS = [
  'Nous recherchons un développeur passionné pour rejoindre notre équipe en croissance. Vous travaillerez sur des projets modernes et innovants.',
  'Opportunité unique pour contribuer à une transformation numérique. Vous aurez l\'occasion d\'apprendre et de développer vos compétences.',
  'Rejoignez une équipe agile et dynamique dans un environnement de startup. Vous bénéficierez d\'une grande autonomie.',
  'Nous cherchons quelqu\'un qui partagera notre passion pour la technologie. Vous travaillerez avec les dernières technologies du marché.',
  'Position idéale pour un professionnel créatif cherchant un nouveau défi. Télétravail flexible disponible.',
  'Nous offrons un environnement collaboratif et innovant. Votre évolution sera au cœur de notre stratégie.',
  'Rejoignez une équipe de experts dans votre domaine. Nous valorisons l\'excellence et la qualité.',
  'Vous serez responsable du développement et de la maintenance de nos applications. Autonomie et respect des délais sont essentiels.',
  'Nous cherchons un professionnel motivé pour renforcer notre équipe. Vous contribuerez à des projets stratégiques.',
  'Opportunité de leadership dans un environnement startup en croissance rapide. Impact direct sur le produit et la vision.',
];

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSalary(): { min: number; max: number } {
  const min = 30000 + Math.floor(Math.random() * 50000);
  const max = min + 10000 + Math.floor(Math.random() * 30000);
  return { min, max };
}

function formatDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

export async function searchJobsMock(criteria: SearchCriteria): Promise<JobOffer[]> {
  // Simulate async delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const results: JobOffer[] = [];
  const resultCount = 15 + Math.floor(Math.random() * 35);

  for (let i = 0; i < resultCount; i++) {
    const title = getRandomElement(JOB_TITLES);
    const company = getRandomElement(COMPANIES);
    const location = getRandomElement(LOCATIONS);
    const salary = getRandomSalary();
    const contractType = getRandomElement(CONTRACT_TYPES);
    const remote = getRandomElement(REMOTE_OPTIONS);
    const experience = getRandomElement(EXPERIENCE_LEVELS);
    const skills = getRandomElement(SKILLS_TEXT);

    results.push({
      id: generateId(),
      title,
      company,
      location,
      description: `
        ${getRandomElement(DESCRIPTIONS)}
        
        Compétences requises: ${skills}
        
        Conditions: ${contractType}, ${remote === 'Full' ? 'Full-remote' : remote === 'Partial' ? 'Télétravail partiel' : 'Télétravail non disponible'}
        Niveau requis: ${experience}
      `,
      salary: {
        min: salary.min,
        max: salary.max,
        currency: 'EUR',
      },
      contractType,
      remote,
      experienceLevel: experience,
      postedDate: formatDate(Math.floor(Math.random() * 30)),
      url: `https://job-details-${generateId()}.example.com`,
      source: 'Mock Provider',
    });
  }

  // Filter by criteria if provided
  let filtered = results;

  if (criteria.title) {
    const titleLower = criteria.title.toLowerCase();
    filtered = filtered.filter(r =>
      r.title.toLowerCase().includes(titleLower) ||
      r.description.toLowerCase().includes(titleLower)
    );
  }

  if (criteria.location) {
    const locationLower = criteria.location.toLowerCase();
    filtered = filtered.filter(r =>
      r.location.toLowerCase().includes(locationLower)
    );
  }

  if (criteria.contractType) {
    filtered = filtered.filter(r => r.contractType === criteria.contractType);
  }

  if (criteria.remote) {
    filtered = filtered.filter(r => r.remote === criteria.remote);
  }

  if (criteria.experienceLevel) {
    filtered = filtered.filter(r => r.experienceLevel === criteria.experienceLevel);
  }

  if (criteria.salaryMin) {
    filtered = filtered.filter(r => (r.salary?.min || 0) >= criteria.salaryMin);
  }

  return filtered;
}

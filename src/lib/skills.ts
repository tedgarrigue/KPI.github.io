export const SKILLS_DICT = {
  // Langages
  javascript: ['javascript', 'js', 'node', 'nodejs', 'node.js'],
  typescript: ['typescript', 'ts'],
  python: ['python', 'py'],
  java: ['java', 'jvm'],
  golang: ['go', 'golang'],
  rust: ['rust'],
  cpp: ['c++', 'cpp', 'c#', 'csharp'],
  php: ['php'],
  ruby: ['ruby', 'rails'],
  kotlin: ['kotlin'],
  swift: ['swift'],
  
  // Frontend
  react: ['react', 'reactjs', 'react.js'],
  vue: ['vue', 'vuejs', 'vue.js'],
  angular: ['angular', 'angularjs'],
  nextjs: ['next.js', 'nextjs', 'next'],
  svelte: ['svelte'],
  html: ['html', 'html5'],
  css: ['css', 'css3', 'scss', 'sass'],
  tailwind: ['tailwind', 'tailwindcss'],
  
  // Backend
  express: ['express', 'expressjs'],
  django: ['django'],
  flask: ['flask'],
  fastapi: ['fastapi', 'fast api'],
  spring: ['spring', 'springboot'],
  laravel: ['laravel'],
  
  // Bases de données
  sql: ['sql', 'mysql', 'postgresql', 'postgres'],
  mongodb: ['mongodb', 'mongo'],
  redis: ['redis'],
  elasticsearch: ['elasticsearch'],
  firebase: ['firebase'],
  dynamodb: ['dynamodb'],
  
  // Cloud & DevOps
  aws: ['aws', 'amazon', 'ec2', 's3'],
  gcp: ['gcp', 'google cloud'],
  azure: ['azure', 'microsoft azure'],
  docker: ['docker', 'containerization'],
  kubernetes: ['kubernetes', 'k8s'],
  jenkins: ['jenkins', 'ci/cd'],
  gitlab: ['gitlab', 'git'],
  github: ['github'],
  
  // Outils & Frameworks
  git: ['git', 'github', 'gitlab', 'bitbucket'],
  webpack: ['webpack'],
  vite: ['vite'],
  graphql: ['graphql'],
  rest: ['rest', 'api rest', 'restful'],
  grpc: ['grpc'],
  
  // Data & ML
  tensorflow: ['tensorflow'],
  pytorch: ['pytorch'],
  pandas: ['pandas'],
  numpy: ['numpy'],
  sklearn: ['sklearn', 'scikit-learn'],
  spark: ['spark', 'pyspark'],
  
  // Soft skills
  communication: ['communication', 'collaboratif', 'teamwork'],
  leadership: ['leadership', 'leader'],
  agile: ['agile', 'scrum', 'kanban'],
};

export function extractSkills(text: string): string[] {
  const lowerText = text.toLowerCase();
  const found = new Set<string>();

  for (const [skill, keywords] of Object.entries(SKILLS_DICT)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        found.add(skill);
        break;
      }
    }
  }

  return Array.from(found);
}

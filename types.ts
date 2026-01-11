
export enum Domain {
  DOMAIN_1 = 'Domain 1: Disabilities, Challenges & AT',
  DOMAIN_2 = 'Domain 2: Accessibility & Universal Design',
  DOMAIN_3 = 'Domain 3: Standards, Laws & Management'
}

export interface Badge {
  id: string;
  label: string;
  icon: string;
  unlockedAt?: number;
}

export interface TopicStats {
  correct: number;
  total: number;
  lastTested: number;
  interval: number; // For spaced repetition (days)
}

export interface UserStats {
  totalQuestionsAnswered: number;
  correctAnswers: number;
  xp: number;
  badges: string[]; // List of badge IDs
  domainPerformance: Record<Domain, { correct: number; total: number }>;
  topicPerformance: Record<string, TopicStats>;
  recentScores: number[];
  streak: number;
  lastActivityDate: string | null;
}

export type AppView = 'DASHBOARD' | 'EXAM' | 'COMPETENCIES' | 'REVIEWS';

export interface Question {
  id: string;
  domain: Domain;
  topic: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

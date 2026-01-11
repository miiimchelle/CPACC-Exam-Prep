
import { Domain, Question, UserStats, Badge } from './types';

export const INITIAL_STATS: UserStats = {
  totalQuestionsAnswered: 0,
  correctAnswers: 0,
  xp: 0,
  badges: [],
  domainPerformance: {
    [Domain.DOMAIN_1]: { correct: 0, total: 0 },
    [Domain.DOMAIN_2]: { correct: 0, total: 0 },
    [Domain.DOMAIN_3]: { correct: 0, total: 0 },
  },
  topicPerformance: {},
  recentScores: [],
  streak: 0,
  lastActivityDate: null,
};

export const BADGE_DEFINITIONS: Badge[] = [
  { id: 'first_step', label: 'First Step', icon: '🎯' },
  { id: 'domain_1_master', label: 'Disability Expert', icon: '🧠' },
  { id: 'domain_2_master', label: 'UD Architect', icon: '🏗️' },
  { id: 'domain_3_master', label: 'Policy Guru', icon: '📜' },
  { id: 'perfect_score', label: 'Unstoppable', icon: '🔥' },
  { id: 'streak_3', label: 'Committed', icon: '🗓️' },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    domain: Domain.DOMAIN_1,
    topic: 'Theoretical Models',
    text: 'Which model of disability views the issue of disability as a socially created problem and a matter of the full integration of individuals into society?',
    options: ['Medical Model', 'Social Model', 'Biopsychosocial Model', 'Economic Model'],
    correctAnswer: 1,
    explanation: 'The Social Model sees disability as a socially created problem rather than an attribute of an individual, emphasizing the removal of societal barriers.'
  },
  {
    id: '2',
    domain: Domain.DOMAIN_2,
    topic: 'Universal Design',
    text: 'What is the primary difference between Universal Design (UD) and Individualized Accommodations?',
    options: [
      'UD is more expensive than accommodations',
      'Accommodations are for everyone, UD is for specific people',
      'UD is proactive and for a wide range of users, accommodations are reactive for individuals',
      'There is no difference between the two'
    ],
    correctAnswer: 2,
    explanation: 'Universal Design aims to be used by the widest range of people from the start, while accommodations are specific modifications for an individual case.'
  },
  {
    id: '3',
    domain: Domain.DOMAIN_3,
    topic: 'International Conventions',
    text: 'Which UN instrument is the first binding international human rights instrument that specifically addresses the rights of people with disabilities?',
    options: [
      'Universal Declaration of Human Rights',
      'Convention on the Rights of Persons with Disabilities (CRPD)',
      'Marrakesh Treaty',
      'Equality Act 2010'
    ],
    correctAnswer: 1,
    explanation: 'The CRPD (2006) is the first legally binding convention specifically protecting and recognizing the rights of people with disabilities.'
  },
  {
    id: '4',
    domain: Domain.DOMAIN_1,
    topic: 'Visual Disabilities',
    text: 'What percentage of males globally are affected by Red-green color vision defects?',
    options: ['0.5%', '2.2%', '8.3%', '12%'],
    correctAnswer: 2,
    explanation: 'According to NIH statistics in the Body of Knowledge, Red-green color vision defects affect 1 in 12 males (8.3%).'
  },
  {
    id: '5',
    domain: Domain.DOMAIN_2,
    topic: 'UDL Guidelines',
    text: 'The UDL framework is built around three overall guidelines: Engagement, Representation, and what third pillar?',
    options: ['Usability', 'Accessibility', 'Action & Expression', 'Compliance'],
    correctAnswer: 2,
    explanation: 'The three UDL guidelines are Engagement (the Why), Representation (the What), and Action & Expression (the How).'
  }
];

export const DOMAIN_COLORS = {
  [Domain.DOMAIN_1]: '#6366f1', // Indigo
  [Domain.DOMAIN_2]: '#10b981', // Emerald
  [Domain.DOMAIN_3]: '#f59e0b', // Amber
};

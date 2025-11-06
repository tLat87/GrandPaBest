import { Artifact, Task } from '../types';

export const ARTIFACTS: Artifact[] = [
  {
    id: 'focus',
    type: 'focus',
    name: 'Grand Relic of Focus',
    description: 'An artifact of knowledge and self-discipline.',
    icon: require('../grandPaBestAssets/img/start.png'), // Укажите путь к PNG
  },
  {
    id: 'energy',
    type: 'energy',
    name: 'Prism Star of Energy',
    description: 'A source of vital energy, brightness and inspiration.',
    icon: require('../grandPaBestAssets/img/roket.png'), // Укажите путь к PNG
  },
  {
    id: 'drive',
    type: 'drive',
    name: 'Candy Core of Drive',
    description: 'A symbol of action, excitement, and reward for effort.',
    icon: require('../grandPaBestAssets/img/book.png'), // Укажите путь к PNG
  },
];

export const TASKS: Task[] = [
  // Focus tasks
  { id: 'focus-1', artifactId: 'focus', title: 'Read 5 pages of a book', duration: 15 },
  { id: 'focus-2', artifactId: 'focus', title: 'Write a short plan for the day', duration: 15 },
  { id: 'focus-3', artifactId: 'focus', title: 'Watch an educational video', duration: 15 },
  { id: 'focus-4', artifactId: 'focus', title: 'Meditate for 10 minutes', duration: 10 },
  { id: 'focus-5', artifactId: 'focus', title: 'Practice deep breathing', duration: 5 },
  
  // Energy tasks
  { id: 'energy-1', artifactId: 'energy', title: 'Go for a 20-minute walk', duration: 20 },
  { id: 'energy-2', artifactId: 'energy', title: 'Do 15 minutes of stretching', duration: 15 },
  { id: 'energy-3', artifactId: 'energy', title: 'Drink 2 glasses of water', duration: 5 },
  { id: 'energy-4', artifactId: 'energy', title: 'Take a power nap', duration: 20 },
  { id: 'energy-5', artifactId: 'energy', title: 'Do jumping jacks for 5 minutes', duration: 5 },
  
  // Drive tasks
  { id: 'drive-1', artifactId: 'drive', title: 'Complete one household chore', duration: 15 },
  { id: 'drive-2', artifactId: 'drive', title: 'Work on a personal project', duration: 30 },
  { id: 'drive-3', artifactId: 'drive', title: 'Make progress on a goal', duration: 20 },
  { id: 'drive-4', artifactId: 'drive', title: 'Organize your workspace', duration: 15 },
  { id: 'drive-5', artifactId: 'drive', title: 'Learn a new skill', duration: 25 },
];

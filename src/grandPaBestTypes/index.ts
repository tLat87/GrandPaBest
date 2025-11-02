export type ArtifactType = 'focus' | 'energy' | 'drive';

export interface Artifact {
  id: string;
  type: ArtifactType;
  name: string;
  description: string;
  icon: any; // require() для PNG изображения
}

export interface Task {
  id: string;
  artifactId: string;
  title: string;
  duration: number; // in minutes
}

export interface CompletedTask {
  id: string;
  taskId: string;
  artifactId: string;
  date: string; // YYYY-MM-DD
  completedAt: number; // timestamp
}

export interface ArtifactProgress {
  artifactId: string;
  totalTasks: number;
  completedTasks: number;
  uncompletedTasks: number;
}

export interface DailyTask {
  taskId: string;
  artifactId: string;
  title: string;
  duration: number;
  completed: boolean;
}

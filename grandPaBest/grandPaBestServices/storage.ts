import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompletedTask, DailyTask } from '../grandPaBestTypes/index';

const KEYS = {
  COMPLETED_TASKS: 'completed_tasks',
  DAILY_TASKS: 'daily_tasks',
};

export const storageService = {
  async getCompletedTasks(): Promise<CompletedTask[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.COMPLETED_TASKS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting completed tasks:', error);
      return [];
    }
  },

  async saveCompletedTask(task: CompletedTask): Promise<void> {
    try {
      const tasks = await this.getCompletedTasks();
      tasks.push(task);
      await AsyncStorage.setItem(KEYS.COMPLETED_TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving completed task:', error);
    }
  },

  async getDailyTasks(date: string): Promise<DailyTask[]> {
    try {
      const data = await AsyncStorage.getItem(`${KEYS.DAILY_TASKS}_${date}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting daily tasks:', error);
      return [];
    }
  },

  async saveDailyTasks(date: string, tasks: DailyTask[]): Promise<void> {
    try {
      await AsyncStorage.setItem(`${KEYS.DAILY_TASKS}_${date}`, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving daily tasks:', error);
    }
  },
};

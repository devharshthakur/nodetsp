import { ProjectInitializationService } from '@/services/projectInitService.js';

/**
 * Main initialization function for creating a new TypeScript project
 */
export async function init(): Promise<void> {
  const initializationService = new ProjectInitializationService();
  await initializationService.initialize();
}

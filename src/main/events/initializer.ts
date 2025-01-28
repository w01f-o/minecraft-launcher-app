import { MainEvent, MainEventParams } from '../types/MainEvent';

export function registerMainEvent(params: MainEventParams): () => MainEvent {
  return (): MainEvent => new MainEvent(params);
}

export const initializeMainEvents = (): void => {
  const modules = import.meta.glob('./*.event.ts', { eager: true });

  Object.values(modules).forEach(module => {
    const { default: registerFunc } = module as { default: () => void };

    registerFunc();
  });
};

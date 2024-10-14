type LogFunction = (message: string, ...args: unknown[]) => void;

const logger: Record<'info' | 'error', LogFunction> = {
  info: (message: string, ...args: unknown[]): void => {
    console.log(`[INFO] ${message}`, ...args);
  },
  error: (message: string, ...args: unknown[]): void => {
    console.error(`[ERROR] ${message}`, ...args);
  },
};

export default logger;

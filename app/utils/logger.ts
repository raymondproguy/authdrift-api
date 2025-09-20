// ./app/utils/logger.ts

import 'colors';

export const logger = {
  info: (message: string) => {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`.blue);
  },
  success: (message: string) => {
    console.log(`[SUCCESS] ${new Date().toISOString()}: ${message}`.green);
  },
  warn: (message: string) => {
    console.log(`[WARN] ${new Date().toISOString()}: ${message}`.yellow);
  },
  error: (message: string) => {
    console.log(`[ERROR] ${new Date().toISOString()}: ${message}`.red);
  },
  debug: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${new Date().toISOString()}: ${message}`.magenta);
    }
  }
};

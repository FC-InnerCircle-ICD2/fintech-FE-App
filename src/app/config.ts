export const config = {
  env: import.meta.env.VITE_NODE_ENV || 'development',
  apiUrl: import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '',
  appTitle: import.meta.env.VITE_APP_TITLE || 'Payment Service',
  mswEnabled: import.meta.env.VITE_MSW_ENABLED === 'true',
  isDev: import.meta.env.VITE_NODE_ENV === 'development',
  isProd: import.meta.env.VITE_NODE_ENV === 'production',
  isTest: import.meta.env.VITE_NODE_ENV === 'test',
} as const;

export const API_BASE_URL = config.apiUrl;

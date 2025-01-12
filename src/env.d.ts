/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: 'development' | 'production' | 'test';
  readonly VITE_API_URL: string;
  readonly VITE_MSW_ENABLED: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

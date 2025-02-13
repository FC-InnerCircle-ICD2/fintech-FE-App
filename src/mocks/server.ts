// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// 핸들러 등록
export const server = setupServer(...handlers);

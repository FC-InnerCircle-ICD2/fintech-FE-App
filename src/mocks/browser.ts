// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// 핸들러를 등록해서 워커 생성
export const worker = setupWorker(...handlers);

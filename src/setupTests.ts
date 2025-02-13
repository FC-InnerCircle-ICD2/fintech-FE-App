// src/setupTests.ts
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@mocks/server';
// 모든 테스트 전에 MSW 서버를 시작합니다.
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// 각 테스트 후 핸들러를 초기화합니다.
afterEach(() => server.resetHandlers());

// 모든 테스트 후 MSW 서버를 종료합니다.
afterAll(() => server.close());

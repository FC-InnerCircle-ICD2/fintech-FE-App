import { authHandler } from './handlers/auth';
import { orderHandler } from './handlers/order';
import { paymentHandler } from './handlers/payment';

export const handlers = [...authHandler, ...orderHandler, ...paymentHandler];

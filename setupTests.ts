import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { server } from './src/__mocks__/handlers';
expect.extend(matchers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

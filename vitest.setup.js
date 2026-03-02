// vitest.setup.js
import '@testing-library/jest-dom';
import { server } from './src/mocks/server.js';

// Start server before all tests
beforeAll(() => server.listen());
// Reset handlers after each test
afterEach(() => server.resetHandlers());
// Clean up after all tests
afterAll(() => server.close());
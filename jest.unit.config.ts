import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageReporters: ['text', 'lcov'],
  coverageDirectory: 'coverage',
  testMatch: ['**/tests/**/*.spec.ts'],
  clearMocks: true,
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.unit.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
};

export default config;

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json',
    },
  },
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  setupFiles: ['<rootDir>/jest.setup.ts'],
  coverageReporters: ['text', 'lcov'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '\\.test\\.tsx$',
    '\\.spec\\.tsx$',
    'src/__tests__/setup.ts',
  ],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      statements: 70,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;

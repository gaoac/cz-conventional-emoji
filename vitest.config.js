import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Test environment
    environment: 'node',
    // Test file matching pattern
    include: ['tests/**/*.test.js'],
    // Global variables configuration
    globals: true,
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'test/**',
        'tests/**',
        'index.js',
        '**/*.test.js',
        '**/*.config.js',
        '**/*.d.ts',
        '**/.versionrc.js',
        '**/README*.md',
        '**/LICENSE',
        '**/package.json',
        '**/package-lock.json',
        '**/yarn.lock',
        '**/pnpm-lock.yaml',
        '.history/**',
        'coverage/**'
      ]
    }
  }
})

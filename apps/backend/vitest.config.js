import path from 'path'

export default {
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  test: {
    clearMocks: true,
    globals: true,
    fileParallelism: false,
    setupFiles: ['dotenv/config'],
    testTimeout: 1000,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  }
}

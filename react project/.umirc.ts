import { defineConfig } from 'umi';
const { resolve } = require('path');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
  },
  dynamicImport: {
    loading: '@/components/Loading',
  },
  alias: {
    utils: resolve(__dirname, './src/utils'),
    components: resolve(__dirname, './src/components'),
    common: resolve(__dirname, './src/common'),
    staticList:resolve(__dirname,'./src/staticList'),
    api: resolve(__dirname, './src/services/'),
  },
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
});

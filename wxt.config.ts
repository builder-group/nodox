import { defineConfig, defineRunnerConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  outDir: 'dist',
  // Disabled because it only works with admin permissions for me ('sudo')
	runner: defineRunnerConfig({ disabled: true }),
});

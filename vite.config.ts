import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MyReactLibrary',
      fileName: (format) => `my-react-library.${format}.js`,
      formats: ['es', 'umd'], // ES 모듈과 UMD 번들 생성
    },
    rollupOptions: {
      external: ['react'], // React와 ReactDOM은 Peer Dependency로 설정
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from 'vite-plugin-compression';

export default defineConfig(({ command }): UserConfig => {
  if (command === "build") {
    return {
      mode: "production",
      plugins: [react(),
        compression({
          algorithm: 'brotliCompress', 
          ext: '.br', 
        })
      ],
      build: {
        outDir: "dist",
        lib: {
          entry: "src/index.ts",
          name: "caro-kann", // 자신의 패키지명 입력
          formats: ["es"],
          fileName: "index",
        },
        minify: true,
        rollupOptions: {
          external: ["react"],
          output: {
            globals: {
              react: "React",
            },
          },
        },
      },
    };
  } else {
    // 개발 환경 설정 등이 필요한 경우 추가
    return {
      plugins: [react()],
    };
  }
});

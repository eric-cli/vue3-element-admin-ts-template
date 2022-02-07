import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import visualizer from "rollup-plugin-visualizer";
import compressPlugin from "vite-plugin-compression";
import { viteMockServe } from "vite-plugin-mock";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      ignore: /^\_/,
      mockPath: "mock",
      localEnabled: true,
      prodEnabled: false,
      // 开发环境无需关心
      // injectCode 只受prodEnabled影响
      // https://github.com/anncwb/vite-plugin-mock/issues/9
      // 下面这段代码会被注入 main.ts
      injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer';
    
          setupProdMockServer();
          `,
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // global imports to register
      imports: [
        // presets
        "vue",
        "vue-router",
        // custom
        {
          "@vueuse/core": [
            // named imports
            "useMouse", // import { useMouse } from '@vueuse/core',
            // alias
            ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            // default imports
            ["default", "axios"], // import { default as axios } from 'axios',
          ],
          // "[package-name]": [
          //   "[import-names]",
          //   // alias
          //   ["[from]", "[alias]"],
          // ],
        },
      ],
      dts: "src/auto-imports.d.ts",
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
    visualizer({
      filename: "./node_modules/.cache/visualizer/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    compressPlugin({
      ext: ".gz",
      deleteOriginFile: false,
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
    }),
    ElementPlus(),
  ],
  base: "./", //打包路径
  // 配置别名
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/element/index.scss" as *;',
      },
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});

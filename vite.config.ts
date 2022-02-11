import { UserConfigExport, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import visualizer from "rollup-plugin-visualizer";
import compressPlugin from "vite-plugin-compression";
import { viteMockServe } from "vite-plugin-mock";
import svgLoader from "./plugins/svg-loader";
import { resolve } from "path";

// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  console.log(command, mode);

  // 根据项目配置。可以配置在.env文件
  let prodMock = false;
  return {
    plugins: [
      vue(),
      svgLoader("./src/icons/svg/"),
      viteMockServe({
        ignore: /^\_/, // 自动读取模拟.ts 文件时，请忽略指定格式的文件
        mockPath: "mock", // default: mock 设置模拟.ts 文件的存储文件夹
        watchFiles: true, // default: true 设置是否监视mockPath对应的文件夹内文件中的更改
        supportTs: true, // default: true 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        localEnabled: command === "serve", // default: command === 'serve' 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
        prodEnabled: command !== "serve" && prodMock, // default: command !== 'serve' 设置打包是否启用 mock 功能
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
              "useFullscreen", // import { useFullscreen } from '@vueuse/core',
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
    base: "./", // 设置打包路径
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: 9527, // 类型： number 指定服务器端口;
      open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: "0.0.0.0", // 支持从IP启动访问

      // 设置代理，根据我们项目实际情况配置
      // proxy: {
      //   "/api": {
      //     // target: "https://qa.smx.gantangzw.cn",
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path) => path.replace("/api", "/api"),
      //   },
      // },
    },
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
  };
};

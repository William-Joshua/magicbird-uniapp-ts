/*
 * https://vitejs.cn/config/
 */
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';
import eslintPlugin from 'vite-plugin-eslint';
// import { viteMockServe } from 'vite-plugin-mock';
// import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
// import UnoCSS from 'unocss/vite';

// import WindiCSS from 'vite-plugin-windicss';
// import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup';

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
  '@': pathResolve('./src/'),
};

const viteConfig = defineConfig((mode: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode.mode, root);

  const localEnabled: boolean = (env.VITE_USE_MOCK as unknown as boolean) || false;
  const prodEnabled: boolean = (env.VITE_USE_CHUNK_MOCK as unknown as boolean) || false;

  return {
    base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
    root: root,
    resolve: { alias },
    define: {
      'process.env': {},
    },

    server: {
      host: true,
      // host: '0.0.0.0',
      port: env.VITE_PORT as unknown as number,
      open: env.VITE_OPEN === 'true',
      proxy: {
        [env.VITE_BASE]: {
          target: env.VITE_BASE_URL,
          ws: true,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(env.VITE_BASE, 'g'), '/'),
        },
      },
    },
    // build: {
    //   outDir: 'dist',
    //   sourcemap: false,
    //   chunkSizeWarningLimit: 1500,
    //   rollupOptions: {
    //     output: {
    //       entryFileNames: `assets/[name].${new Date().getTime()}.js`,
    //       chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
    //       assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
    //       compact: true,
    //       manualChunks: {
    //         vue: ['vue', 'vue-router', 'vuex'],
    //         echarts: ['echarts'],
    //       },
    //     },
    //   },
    //   terserOptions: {
    //     compress: {
    //       drop_console: true,
    //       drop_debugger: true,
    //     },
    //     ie8: true,
    //     output: {
    //       comments: true,
    //     },
    //   },
    // },
    plugins: [
      uni(),
      // viteMockServe({
      //   // ?????????????????????mock?????????
      //   mockPath: 'mock',
      //   localEnabled: localEnabled, // ??????????????????
      //   prodEnabled: prodEnabled, // ??????????????????
      //   supportTs: true, // ???????????????????????? ts ??????????????? ????????????????????????????????????.js ?????????
      //   watchFiles: true, // ??????????????????
      // }),

      // https://github.com/unocss/unocss
      // see unocss.config.ts for config
      // UnoCSS(),

      // ????????? easycom
      // https://github.com/antfu/unplugin-vue-components
      // Components({
      //   dirs: ['src/components'],
      //   extensions: ['vue', 'ts', 'tsx'],
      //   dts: 'src/types/components.d.ts',
      //   deep: true,
      // }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', 'pinia', 'uni-app'],
        dts: 'src/types/auto-imports.d.ts',
        dirs: ['src/hooks', 'src/stores/modules'],
        vueTemplate: true,
      }),
      // WindiCSS({
      //   scan: {
      //     dirs: ['.'], // ???????????????????????????
      //     fileExtensions: ['vue', 'js', 'ts'], // ??????????????????vue/js/ts
      //   },
      // }),
      // MiniProgramTailwind(),
      // eslintPlugin({
      //   include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts'],
      //   exclude: ['./node_modules/**'],
      //   cache: false,
      // }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@import "@/assets/style/main.scss";',
        },
      },
    },
  };
});

export default viteConfig;

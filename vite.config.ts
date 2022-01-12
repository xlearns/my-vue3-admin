import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import vueJsx from "@vitejs/plugin-vue-jsx"
import { wrapperEnv,createProxy } from './build/utils';
import { OUTPUT_DIR } from './build/config';
import { configHtmlPlugin } from './build/plugin/html';
import svgLoader from "vite-svg-loader";


const isPrivate = true 


function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}


const alias = {
  "@": pathResolve("src"),
};
export default ({command,mode})=>{

  const isBuild = command === 'build';

  const root = process.cwd();
  const env = loadEnv(mode, root);
  const {
    VITE_PORT,
    VITE_DROP_CONSOLE,
    VITE_PUBLIC_PATH,
    VITE_PROXY,
  } = wrapperEnv(env);
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    server: {
      https: false,
      port: VITE_PORT,
      host: isPrivate?"127.0.0.1":"0.0.0.0",
      proxy:createProxy(VITE_PROXY)
    },
    plugins: [
      vue(),
      vueJsx(),
      svgLoader(),
      configHtmlPlugin(wrapperEnv(env),isBuild)
    ],
    build: {
      minify: false,
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  }
}


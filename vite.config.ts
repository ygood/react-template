import { defineConfig, normalizePath } from 'vite';
import viteEslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import autoprefixer from 'autoprefixer';
import viteStylelint from 'vite-plugin-stylelint';
import react from '@vitejs/plugin-react';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { visualizer } from 'rollup-plugin-visualizer';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(
  path.resolve('./src/assets/styles/variable.scss')
);

// let apiUrl = import.meta.env.VITE_APP_PROXY_URL as string;

// 是否为生产环境，在生产环境一般会注入 NODE_ENV 这个环境变量，见下面的环境变量文件配置
const isProduction = process.env.NODE_ENV === 'production';
const CDN_URL = '/';

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? CDN_URL : '/',
  plugins: [
    react(),
    viteEslint(),
    viteStylelint({
      // 对某些文件排除检查
      exclude: ['windicss', 'node_modules']
    }),
    svgr(),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons')],
      symbolId: 'menu_icon_[name]'
    }),
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: ['ie >= 11']
    }),
    // 产物分析
    visualizer({
      open: false
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    },
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // Vite 会对后缀带有.module的样式文件自动应用 CSS Modules
      // 其中，name 表示当前文件名，local 表示类名,
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    postcss: {
      plugins: [
        // 样式适配多种浏览器
        autoprefixer({
          // 指定目标浏览器
          grid: true,
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            '> 1%'
          ]
        })
      ]
    }
  },
  build: {
    // 单文件或者内联，小于8KB转换成base64
    assetsInlineLimit: 8 * 1024,
    target: ['es2015'],
    rollupOptions: {
      output: {
        // manualChunks 配置
        manualChunks: {
          // 将 React等第三方库 相关库打包成单独的 chunk 中
          'react-vendor': ['react', 'react-dom'],
          'antd-vendor': ['antd']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 路径重命名
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://172.29.161.176:3030',
        changeOrigin: true
      }
    }
  },
  assetsInclude: ['.gltf', '.ttf', 'mp4', '.mp3']
});

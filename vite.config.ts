import { defineConfig, normalizePath } from 'vite';
import viteEslint from 'vite-plugin-eslint';
import autoprefixer from 'autoprefixer';
import viteStylelint from 'vite-plugin-stylelint';
import react from '@vitejs/plugin-react';
import path from 'path';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(
  path.resolve('./src/assets/styles/variable.scss')
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEslint(),
    viteStylelint({
      // 对某些文件排除检查
      exclude: ['windicss', 'node_modules']
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 路径重命名
      '@assets': path.join(__dirname, 'src/assets')
    }
  }
});

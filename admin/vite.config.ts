import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      styleImport({
          libs: [
              {
                  libraryName: 'ant-design-vue',
                  esModule: true,
                  resolveStyle: (name) => {
                      return `ant-design-vue/es/${name}/style/css`;
                  }
              }
          ]
      })
  ]
})

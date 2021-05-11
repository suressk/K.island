import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import styleImport from 'vite-plugin-style-import'
import type {Alias} from 'vite'
// import type { UserConfig, ConfigEnv } from 'vite'

function pathResolve(dir: string) {
    return resolve(__dirname, '.', dir)
}

function createAlias(alias: [string, string][]): Alias[] {
    return alias.map((item) => {
        const [alia, src] = item
        return {
            find: new RegExp(alia),
            replacement: pathResolve(src) + '/'
        }
    })
}

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
    ],
    resolve: {
        alias: createAlias([
            ['/@/', 'src'],
            ['/@assets/', 'src/assets'],
            ['/@comp/', 'src/components'],
            ['/@api/', 'src/api']
        ]),
    },
    optimizeDeps: {
        include: [
            '@kangc/v-md-editor/lib/theme/github.js',
            '@kangc/v-md-editor/lib/theme/vuepress.js'
        ]
    }
})

// export default (): UserConfigExport => {
//     return {
//         css: {
//              preprocessorOptions: {
//                  sass:  { javascriptEnabled: true }
//              }
//         },
//         resolve: {
//             alias: createAlias([
//                 ['/@/', 'src'],
//                 ['/@assets/', 'src/assets'],
//                 ['/@comp/', 'src/components'],
//             ])
//         },
//         plugins: [
//             vue(),
//             styleImport({
//                 libs: [
//                     {
//                         libraryName: 'ant-design-vue',
//                         esModule: true,
//                         resolveStyle: (name) => {
//                             return `ant-design-vue/es/${name}/style/css`;
//                         }
//                     }
//                 ]
//             }),
//             {
//                 optimizeDeps: {
//                     include: [
//                         '@kangc/v-md-editor/lib/theme/github.js',
//                         '@kangc/v-md-editor/lib/theme/vuepress.js'
//                     ]
//                 }
//             }
//         ]
//     }
// }

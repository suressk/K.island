import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import {resolve} from 'path'
import type {Alias} from 'vite'
import viteSvgIcons from 'vite-plugin-svg-icons'
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
        }),
        viteSvgIcons({
            iconDirs: [pathResolve('src/assets/svg')],
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    resolve: {
        alias: createAlias([
            ['/@/', 'src'],
            ['/@assets/', 'src/assets'],
            ['/@comp/', 'src/components'],
        ]),
    },
    optimizeDeps: {
        include: [
            '@kangc/v-md-editor/lib/theme/github.js',
            '@kangc/v-md-editor/lib/theme/vuepress.js'
        ]
    }
})

// export default ({ command, mode }: ConfigEnv): UserConfig => {
//     const root = process.cwd()
//
//     return {
//         root,
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
//             })
//         ]
//     }
// }

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import marked from 'marked'
import highlightJs from 'highlight.js'
export function parseMarkdownFile (content: string) {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight (code: string, language: string) {
      const validLanguage = highlightJs.getLanguage(language)
        ? language
        : 'plaintext'
      return highlightJs.highlight(validLanguage, code).value // 根据对应语法高亮
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  })
  return marked(content) // 解析 .md 文件为 HTML
}

export { marked }

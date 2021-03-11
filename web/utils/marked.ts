import marked from 'marked'
import highlightJs from 'highlight.js'

export function parseMarkdownFile (contentStr: string): string {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight(code: string, lang: string): string | void {
      const validLang = highlightJs.getLanguage(lang)
        ? lang : 'plaintext'
      return highlightJs.highlight(validLang, code).value
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  })
  return marked(contentStr)
}

export { marked }

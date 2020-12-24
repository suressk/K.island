/**
 * Tab 键四个空格缩进指令
 * */
export default {
  mounted (el: HTMLInputElement) {
    el.focus()
    el.addEventListener(
      'keydown',
      function (e) {
        if (e.code === 'Tab' || e.keyCode === 9) {
          e.preventDefault()
          const indent = '    ' // 四个缩进空格
          const startPoint = el.selectionStart || 0
          const endPoint = el.selectionEnd || 0

          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          let selected = window.getSelection() ? window.getSelection().toString() : ''
          selected = indent + selected.replace(/\n/g, '\n' + indent)
          el.value =
            el.value.substring(0, startPoint) +
            selected +
            el.value.substring(endPoint)
          el.setSelectionRange(
            startPoint + indent.length,
            startPoint + indent.length
          )
        }
      },
      false)
  }
}

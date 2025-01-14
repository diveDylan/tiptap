import { getAttributes } from '@tiptap/core'
import { MarkType } from '@tiptap/pm/model'
import { Plugin, PluginKey } from '@tiptap/pm/state'

type ClickHandlerOptions = {
  type: MarkType
}

export function clickHandler(options: ClickHandlerOptions): Plugin {
  return new Plugin({
    key: new PluginKey('handleClickLink'),
    props: {
      handleClick: (view, pos, event) => {
        const attrs = getAttributes(view.state, options.type.name)
        const link = (event.target as HTMLElement)?.closest('a')

        const href = link?.href ?? attrs.href
        const target = link?.target ?? attrs.target

        if (link && href) {
          window.open(href, target)

          return true
        }

        return false
      },
    },
  })
}

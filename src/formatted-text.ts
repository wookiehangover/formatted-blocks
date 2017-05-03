import { map, assign, compact } from 'lodash'
import { UnistNode, FormattedText, FormattedSpan, Handler } from './typings'
import handlers from './handlers'

export default function toFormattedText (node: UnistNode, index: number): FormattedText {
  let props: FormattedText
  const handler:  Handler | null = handlers[node.tagName]

  if (node.type === 'element' && handler) {
    props = handler(node)

    if (node.children.length === 1) {
      props.text = map(node.children, 'value').join('')
    } else {
      props.type = 'FormattedText'
      props.spans = map<UnistNode, FormattedText>(node.children, toFormattedText)
    }
  } else
  if (node.type === 'element') {
    props = assign({}, node, {
      children: compact(map<UnistNode, FormattedText>(node.children, toFormattedText))
    })
  } else
  if (node.type === 'text') {
    props = {
      type: 'FormattedSpan',
      text: node.value
    }
  }

  if (props.text === '\n') {
    return null
  }

  return props
}

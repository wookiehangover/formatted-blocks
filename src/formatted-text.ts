import { UnistNode, FormattedText, Handler } from './typings'
import handlers from './handlers'

// Helper functions to replace lodash
function compact<T>(array: (T | null | undefined)[]): T[] {
  return array.filter((item): item is T => item != null)
}

export default function toFormattedText (node: UnistNode): FormattedText | null {
  let props: FormattedText
  const handler: Handler | null = handlers[node.tagName || ''] || null

  if (node.type === 'root') {
    // Handle root node - convert children and return as FormattedText
    const children = compact(node.children?.map(toFormattedText) || [])
    return {
      type: 'FormattedText',
      children: children as FormattedText[]
    }
  } else if (node.type === 'element' && handler) {
    props = handler(node)

    if (node.children && node.children.length === 1) {
      props.text = node.children.map(child => child.value || '').join('')
    } else {
      props.type = 'FormattedText'
      props.spans = node.children?.map(toFormattedText).filter((span): span is FormattedText => span !== null) || []
    }
  } else if (node.type === 'element') {
    props = {
      ...node,
      children: compact(node.children?.map(toFormattedText) || [])
    }
  } else if (node.type === 'text') {
    props = {
      type: 'FormattedSpan',
      text: node.value || ''
    }
  } else {
    return null
  }

  if (props.text === '\n') {
    return null
  }

  return props
}

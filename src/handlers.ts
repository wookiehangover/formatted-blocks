import { HandlerList } from './typings'

const handlers: HandlerList = {
  em: () => ({
    type: 'FormattedSpan',
    format: { italic: true },
  }),

  strong: () => ({
    type: 'FormattedSpan',
    format: { bold: true },
  }),

  i: () => ({
    type: 'FormattedSpan',
    format: { italics: true },
  }),

  b: () => ({
    type: 'FormattedSpan',
    format: { bold: true },
  }),

  a: (node) => ({
    type: 'FormattedSpan',
    destination: {
      discriminator: 'WebDestination',
      url: (node.properties?.['href'] as string) || '',
    },
  }),

  p: (node) => ({
    type: 'FormattedText',
    tagName: node.tagName || 'p',
  }),

  h1: (node) => ({
    type: 'FormattedText',
    tagName: node.tagName || 'h1',
  }),

  h2: (node) => ({
    type: 'FormattedText',
    tagName: node.tagName || 'h2',
  }),

  h3: (node) => ({
    type: 'FormattedText',
    tagName: node.tagName || 'h3',
  }),

  h4: (node) => ({
    type: 'FormattedText',
    tagName: node.tagName || 'h4',
  }),

  h5: (node) => ({
    type: 'FormattedText',
    tagName: node.tagName || 'h5',
  }),

  h6: (node) => ({
    type: 'FormattedText',
    tagName: node.tagName || 'h6',
  }),

  ul: (node) => ({
    type: 'FormattedText',
    tagName: node.tagName || 'ul',
  }),

  ol: (node) => ({
    type: 'FormattedText',
    tagName: node.tagName || 'ol',
  }),

  li: (node) => ({
    type: 'FormattedText',
    tagName: node.tagName || 'li',
  }),
}

export default handlers

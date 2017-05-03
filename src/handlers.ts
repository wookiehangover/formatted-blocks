import { HandlerList } from './typings'

const handlers: HandlerList = {
  'em': node => ({
    type: 'FormattedSpan',
    format: { italic: true }
  }),

  'strong': node => ({
    type: 'FormattedSpan',
    format: { bold: true }
  }),

  'i': node => ({
    type: 'FormattedSpan',
    format: { italics: true }
  }),

  'b': node => ({
    type: 'FormattedSpan',
    format: { bold: true }
  }),

  'a': node => ({
    type: 'FormattedSpan',
    destination: {
      discriminator: 'WebDestination',
      url: node.properties.href
    }
  }),

  'p': node => ({
    type: 'FormattedText',
    tagName: node.tagName
  }),

  'h1': node => ({
    type: 'FormattedText',
    tagName: node.tagName
  })
}

export default handlers

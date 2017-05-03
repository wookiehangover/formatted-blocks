import compact = require('lodash/compact')
import assign = require('lodash/assign')
import toHast = require('mdast-util-to-hast')
import toFormattedText from './formatted-text'
import { UnistNode } from './typings/unist-node'
import { FormattedText } from './typings/formatted-text'

export = function FormattedBlocks() {
  this.Compiler = (node: UnistNode): FormattedText => {
    const hast = toHast(node)
    const children = compact(hast.children.map(toFormattedText))
    return assign(hast, { children })
  }
}

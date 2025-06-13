import { toHast } from 'mdast-util-to-hast'
import toFormattedText from './formatted-text'
import { FormattedText } from './typings/formatted-text'

// Helper function to replace lodash compact
function compact<T>(array: (T | null | undefined)[]): T[] {
  return array.filter((item): item is T => item != null)
}

interface Processor {
  Compiler: (node: unknown) => FormattedText
}

function FormattedBlocks(this: Processor): void {
  this.Compiler = (node: unknown): FormattedText => {
    const hast = toHast(node as any)
    const children = compact((hast as any).children?.map(toFormattedText) || [])
    return {
      type: 'FormattedText',
      children: children as FormattedText[]
    }
  }
}

export default FormattedBlocks

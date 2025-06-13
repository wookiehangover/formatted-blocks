/**
 * Example usage of formatted-blocks
 * 
 * This example shows how to use the library to convert Markdown
 * to the FormattedBlocks format.
 */

const { unified } = require('unified')
const { default: remarkParse } = require('remark-parse')
const { toHast } = require('mdast-util-to-hast')
const { default: toFormattedText } = require('./lib/formatted-text')

// Sample Markdown content
const markdown = `
# Welcome to FormattedBlocks

This is a **bold** statement with *italic* text and a [link](https://example.com).

## Features

- Platform independent formatting
- Rich text support
- Easy to use API
`

console.log('🔄 Converting Markdown to FormattedBlocks...\n')

// Parse the Markdown
const processor = unified().use(remarkParse)
const mdast = processor.parse(markdown)

console.log('📝 Original Markdown:')
console.log(markdown)

console.log('\n🌳 MDAST (Markdown AST):')
console.log(JSON.stringify(mdast, null, 2))

// Convert to HAST
const hast = toHast(mdast)

console.log('\n🏗️ HAST (HTML AST):')
console.log(JSON.stringify(hast, null, 2))

// Convert to FormattedBlocks
const formattedBlocks = toFormattedText(hast)

console.log('\n✨ FormattedBlocks Output:')
console.log(JSON.stringify(formattedBlocks, null, 2))

console.log('\n✅ Conversion complete!')

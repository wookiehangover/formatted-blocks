# Formatted Blocks

> Serialized platform independent content formatting - converts Markdown to structured FormattedBlocks format

[![npm version](https://badge.fury.io/js/formatted-blocks.svg)](https://badge.fury.io/js/formatted-blocks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

FormattedBlocks is a TypeScript library that converts Markdown content into a structured, platform-independent format suitable for rich text rendering across different platforms and frameworks. It transforms Markdown AST (Abstract Syntax Tree) into a normalized format that preserves formatting information while being easy to consume by various rendering engines.

## Installation

```bash
npm install formatted-blocks
```

## Quick Start

### Basic Usage

```typescript
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import FormattedBlocks from 'formatted-blocks'

const processor = unified()
  .use(remarkParse)
  .use(FormattedBlocks)

const markdown = `
# Hello World

The *quick* **brown** fox jumped over the [lazy dog](https://example.com).
`

const tree = processor.parse(markdown)
const result = processor.runSync(tree)
console.log(JSON.stringify(result, null, 2))
```

### Direct API Usage

```typescript
import { toHast } from 'mdast-util-to-hast'
import toFormattedText from 'formatted-blocks/lib/formatted-text'

// Convert MDAST to HAST, then to FormattedBlocks
const hast = toHast(mdastTree)
const formattedBlocks = toFormattedText(hast)
```

## Output Format

FormattedBlocks converts Markdown into a structured format with two main types:

### FormattedText

Represents block-level elements (paragraphs, headings):

```json
{
  "type": "FormattedText",
  "tagName": "h1",
  "spans": [
    {
      "type": "FormattedSpan",
      "text": "Hello World"
    }
  ]
}
```

### FormattedSpan

Represents inline elements with formatting:

```json
{
  "type": "FormattedSpan",
  "text": "bold text",
  "format": {
    "bold": true
  }
}
```

## Supported Elements

| Markdown | Element Type | Output |
|----------|--------------|---------|
| `*italic*` | Emphasis | `{ format: { italic: true } }` |
| `**bold**` | Strong | `{ format: { bold: true } }` |
| `[link](url)` | Link | `{ destination: { discriminator: "WebDestination", url: "..." } }` |
| `# Heading` | Heading | `{ type: "FormattedText", tagName: "h1" }` |
| `Paragraph` | Paragraph | `{ type: "FormattedText", tagName: "p" }` |

## Example Output

Input Markdown:
```markdown
# The *lazy* dog looked **away**.

The *quick*, **brown** fox jumped over the [lazy dog](https://google.com/?s=lazy-dog)
```

Output FormattedBlocks:
```json
{
  "type": "FormattedText",
  "children": [
    {
      "type": "FormattedText",
      "tagName": "h1",
      "spans": [
        {
          "type": "FormattedSpan",
          "text": "The "
        },
        {
          "type": "FormattedSpan",
          "text": "lazy",
          "format": { "italic": true }
        },
        {
          "type": "FormattedSpan",
          "text": " dog looked "
        },
        {
          "type": "FormattedSpan",
          "text": "away",
          "format": { "bold": true }
        },
        {
          "type": "FormattedSpan",
          "text": "."
        }
      ]
    }
  ]
}
```

## API Reference

### Types

#### FormattedText
```typescript
interface FormattedText {
  type: string
  text?: string
  spans?: FormattedText[]
  children?: FormattedText[]
  tagName?: string
  [key: string]: unknown
}
```

#### FormattedSpan
```typescript
interface FormattedSpan {
  type: string
  text?: string
  format?: FormatOptions
  destination?: Destination
}
```

#### FormatOptions
```typescript
interface FormatOptions {
  bold?: boolean
  italic?: boolean
  italics?: boolean  // Alternative spelling
  link?: boolean
}
```

#### Destination
```typescript
interface Destination {
  discriminator: string
  url?: string
}
```

### Functions

#### `FormattedBlocks()`
Main unified plugin function. Use with unified processor.

#### `toFormattedText(node: UnistNode): FormattedText | null`
Converts a single HAST node to FormattedText format.

## Development

### Prerequisites
- Node.js 16.0.0 or higher
- npm (comes with Node.js)

### Setup
```bash
# Clone the repository
git clone https://github.com/wookiehangover/formatted-blocks.git
cd formatted-blocks

# Install dependencies
npm install

# Build the project
npm run build
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode compilation
- `npm run clean` - Remove build artifacts
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Project Structure
```
src/
├── compiler.ts          # Main unified plugin
├── formatted-text.ts    # Core conversion logic
├── handlers.ts          # Element-specific handlers
├── index.ts            # Main entry point
└── typings/            # TypeScript type definitions
    ├── formatted-span.ts
    ├── formatted-text.ts
    ├── handler.ts
    ├── index.ts
    └── unist-node.ts

tests/
├── compiler.test.ts     # Compiler plugin tests
├── formatted-text.test.ts # Core conversion logic tests
├── handlers.test.ts     # Element handler tests
├── integration.test.ts  # Integration tests
├── types.test.ts        # Type definition tests
└── edge-cases.test.ts   # Edge cases and error handling
```



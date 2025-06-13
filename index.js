'use strict'

const { unified } = require('unified')
const remarkParse = require('remark-parse')
const { default: formattedBlocks } = require('./lib/compiler')

const input = `
The *quick*, _brown_ fox jumped over the [lazy dog](https://google.com/?s=lazy-dog)

# The _lazy_ dog looked *away*.
`

const processor = unified()
  .use(remarkParse)
  .use(formattedBlocks)

processor.process(input, (err, file) => {
  if (err) {
    console.error('Error:', err)
  } else {
    console.log('Result:', JSON.stringify(file.result, null, 2))
  }
})

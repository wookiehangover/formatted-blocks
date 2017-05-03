'use strict'

const unified = require('unified')
const markdown = require('remark-parse')
const formattedBlocks = require('./lib/compiler')

const input = `
The *quick*, _brown_ fox jumped over the [lazy dog](https://google.com/?s=lazy-dog)

# The _lazy_ dog looked *away*.
`

const processor = unified()
  .use(markdown)
  .use(formattedBlocks)

processor.process(input, (err, file) => {
  console.log(err)
  console.log(JSON.stringify(file.contents, null, 2))
})

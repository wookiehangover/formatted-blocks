# Formatted Blocks

> Serialized platform independent content formatting

## Introduction

FormattedBlocks is a superset of FormattedText that adds support for orgnaizing and arranging block-level layouts.


## FormattedText

FormattedText is a representation of inline elements that contains formatting and styling information. A formatted text node would correspond to an HTML element with "inline" styling when converting an HTML document to FormattedBlocks.


```
{
  spans: [
    {
      text: "The "
    },
    {
      text: "quick ",
      format: {
        italic: true
      }
    },
    {
      text: "brown ",
      format: {
        bold: true
      }
    },
    {
      text: "jumping over "
    },
    {
      text: "the lazy dog",
      format: {
        link: {
          desination: "https://google.com",
          discriminator: "WebDestination"
        }
      }
    }
  ]
}
```

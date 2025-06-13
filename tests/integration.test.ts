import toFormattedText from '../src/formatted-text';
import { UnistNode } from '../src/typings/unist-node';

describe('Integration Tests', () => {
  describe('HAST to FormattedBlocks conversion', () => {
    it('should convert simple paragraph from HAST structure', () => {
      // Simulate what toHast would produce for a simple paragraph
      const hastNode: UnistNode = {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'p',
            children: [
              {
                type: 'text',
                value: 'Hello world',
              },
            ],
          },
        ],
      };

      const result = toFormattedText(hastNode);

      expect(result).toEqual({
        type: 'FormattedText',
        children: [
          {
            type: 'FormattedText',
            tagName: 'p',
            text: 'Hello world',
          },
        ],
      });
    });

    it('should convert paragraph with bold text from HAST structure', () => {
      // Simulate what toHast would produce for "This is **bold** text"
      const hastNode: UnistNode = {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'p',
            children: [
              {
                type: 'text',
                value: 'This is ',
              },
              {
                type: 'element',
                tagName: 'strong',
                children: [
                  {
                    type: 'text',
                    value: 'bold',
                  },
                ],
              },
              {
                type: 'text',
                value: ' text',
              },
            ],
          },
        ],
      };

      const result = toFormattedText(hastNode);

      expect(result).toEqual({
        type: 'FormattedText',
        children: [
          {
            type: 'FormattedText',
            tagName: 'p',
            spans: [
              {
                type: 'FormattedSpan',
                text: 'This is ',
              },
              {
                type: 'FormattedSpan',
                format: { bold: true },
                text: 'bold',
              },
              {
                type: 'FormattedSpan',
                text: ' text',
              },
            ],
          },
        ],
      });
    });

    it('should convert paragraph with italic text from HAST structure', () => {
      // Simulate what toHast would produce for "This is *italic* text"
      const hastNode: UnistNode = {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'p',
            children: [
              {
                type: 'text',
                value: 'This is ',
              },
              {
                type: 'element',
                tagName: 'em',
                children: [
                  {
                    type: 'text',
                    value: 'italic',
                  },
                ],
              },
              {
                type: 'text',
                value: ' text',
              },
            ],
          },
        ],
      };

      const result = toFormattedText(hastNode);

      expect(result).toEqual({
        type: 'FormattedText',
        children: [
          {
            type: 'FormattedText',
            tagName: 'p',
            spans: [
              {
                type: 'FormattedSpan',
                text: 'This is ',
              },
              {
                type: 'FormattedSpan',
                format: { italic: true },
                text: 'italic',
              },
              {
                type: 'FormattedSpan',
                text: ' text',
              },
            ],
          },
        ],
      });
    });

    it('should convert paragraph with link from HAST structure', () => {
      // Simulate what toHast would produce for "Visit [Google](https://google.com) for search"
      const hastNode: UnistNode = {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'p',
            children: [
              {
                type: 'text',
                value: 'Visit ',
              },
              {
                type: 'element',
                tagName: 'a',
                properties: {
                  href: 'https://google.com',
                },
                children: [
                  {
                    type: 'text',
                    value: 'Google',
                  },
                ],
              },
              {
                type: 'text',
                value: ' for search',
              },
            ],
          },
        ],
      };

      const result = toFormattedText(hastNode);

      expect(result).toEqual({
        type: 'FormattedText',
        children: [
          {
            type: 'FormattedText',
            tagName: 'p',
            spans: [
              {
                type: 'FormattedSpan',
                text: 'Visit ',
              },
              {
                type: 'FormattedSpan',
                destination: {
                  discriminator: 'WebDestination',
                  url: 'https://google.com',
                },
                text: 'Google',
              },
              {
                type: 'FormattedSpan',
                text: ' for search',
              },
            ],
          },
        ],
      });
    });

    it('should convert heading from HAST structure', () => {
      // Simulate what toHast would produce for "# Main Title"
      const hastNode: UnistNode = {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'h1',
            children: [
              {
                type: 'text',
                value: 'Main Title',
              },
            ],
          },
        ],
      };

      const result = toFormattedText(hastNode);

      expect(result).toEqual({
        type: 'FormattedText',
        children: [
          {
            type: 'FormattedText',
            tagName: 'h1',
            text: 'Main Title',
          },
        ],
      });
    });
  });
});

import toFormattedText from '../src/formatted-text';
import { UnistNode } from '../src/typings/unist-node';

describe('toFormattedText', () => {
  describe('root node handling', () => {
    it('should handle root node with children', () => {
      const node: UnistNode = {
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

      const result = toFormattedText(node);

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

    it('should handle empty root node', () => {
      const node: UnistNode = {
        type: 'root',
        children: [],
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedText',
        children: [],
      });
    });

    it('should handle root node without children', () => {
      const node: UnistNode = {
        type: 'root',
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedText',
        children: [],
      });
    });
  });

  describe('element node with handler', () => {
    it('should handle element with handler and single child', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'p',
        children: [
          {
            type: 'text',
            value: 'Hello world',
          },
        ],
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedText',
        tagName: 'p',
        text: 'Hello world',
      });
    });

    it('should handle element with handler and multiple children', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'p',
        children: [
          {
            type: 'text',
            value: 'Hello ',
          },
          {
            type: 'element',
            tagName: 'strong',
            children: [
              {
                type: 'text',
                value: 'world',
              },
            ],
          },
        ],
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedText',
        tagName: 'p',
        spans: [
          {
            type: 'FormattedSpan',
            text: 'Hello ',
          },
          {
            type: 'FormattedSpan',
            format: { bold: true },
            text: 'world',
          },
        ],
      });
    });

    it('should handle emphasis element', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'em',
        children: [
          {
            type: 'text',
            value: 'italic text',
          },
        ],
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        format: { italic: true },
        text: 'italic text',
      });
    });

    it('should handle link element', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'a',
        properties: {
          href: 'https://example.com',
        },
        children: [
          {
            type: 'text',
            value: 'link text',
          },
        ],
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        destination: {
          discriminator: 'WebDestination',
          url: 'https://example.com',
        },
        text: 'link text',
      });
    });
  });

  describe('element node without handler', () => {
    it('should handle element without handler', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'unknown',
        children: [
          {
            type: 'text',
            value: 'some text',
          },
        ],
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'element',
        tagName: 'unknown',
        children: [
          {
            type: 'FormattedSpan',
            text: 'some text',
          },
        ],
      });
    });
  });

  describe('text node handling', () => {
    it('should handle text node', () => {
      const node: UnistNode = {
        type: 'text',
        value: 'Hello world',
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        text: 'Hello world',
      });
    });

    it('should handle text node with empty value', () => {
      const node: UnistNode = {
        type: 'text',
        value: '',
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        text: '',
      });
    });

    it('should handle text node without value', () => {
      const node: UnistNode = {
        type: 'text',
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        text: '',
      });
    });

    it('should filter out newline-only text nodes', () => {
      const node: UnistNode = {
        type: 'text',
        value: '\n',
      };

      const result = toFormattedText(node);

      expect(result).toBeNull();
    });
  });

  describe('unknown node types', () => {
    it('should return null for unknown node types', () => {
      const node: UnistNode = {
        type: 'unknown',
      };

      const result = toFormattedText(node);

      expect(result).toBeNull();
    });
  });

  describe('complex nested structures', () => {
    it('should handle complex nested paragraph with formatting', () => {
      const node: UnistNode = {
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
            value: ' and ',
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
            value: ' text.',
          },
        ],
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
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
            text: ' and ',
          },
          {
            type: 'FormattedSpan',
            format: { italic: true },
            text: 'italic',
          },
          {
            type: 'FormattedSpan',
            text: ' text.',
          },
        ],
      });
    });
  });
});

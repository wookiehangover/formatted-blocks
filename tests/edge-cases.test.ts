import toFormattedText from '../src/formatted-text';
import { UnistNode } from '../src/typings/unist-node';

describe('Edge Cases and Error Handling', () => {
  describe('malformed input handling', () => {
    it('should handle node with undefined children', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'p',
        children: undefined,
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedText',
        tagName: 'p',
        spans: [],
      });
    });

    it('should handle node with empty children array', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'p',
        children: [],
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedText',
        tagName: 'p',
        spans: [],
      });
    });

    it('should handle text node with undefined value', () => {
      const node: UnistNode = {
        type: 'text',
        value: undefined,
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        text: '',
      });
    });

    it('should handle element with undefined tagName', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: undefined,
        children: [
          {
            type: 'text',
            value: 'content',
          },
        ],
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'element',
        tagName: undefined,
        children: [
          {
            type: 'FormattedSpan',
            text: 'content',
          },
        ],
      });
    });

    it('should handle deeply nested null results', () => {
      const node: UnistNode = {
        type: 'root',
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'p',
            children: [
              {
                type: 'text',
                value: 'actual content',
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
            text: 'actual content',
          },
        ],
      });
    });

    it('should handle mixed valid and invalid children', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'p',
        children: [
          {
            type: 'text',
            value: 'Valid text',
          },
          {
            type: 'unknown',
          },
          {
            type: 'text',
            value: 'More valid text',
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
            text: 'Valid text',
          },
          {
            type: 'FormattedSpan',
            text: 'More valid text',
          },
        ],
      });
    });
  });

  describe('whitespace handling', () => {
    it('should preserve meaningful whitespace', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'p',
        children: [
          {
            type: 'text',
            value: '  Leading and trailing spaces  ',
          },
        ],
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedText',
        tagName: 'p',
        text: '  Leading and trailing spaces  ',
      });
    });

    it('should handle tabs and other whitespace characters', () => {
      const node: UnistNode = {
        type: 'text',
        value: '\t\r\n\f\v',
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        text: '\t\r\n\f\v',
      });
    });

    it('should filter out standalone newlines but preserve other whitespace', () => {
      const node: UnistNode = {
        type: 'root',
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'text',
            value: ' ',
          },
          {
            type: 'text',
            value: '\t',
          },
        ],
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedText',
        children: [
          {
            type: 'FormattedSpan',
            text: ' ',
          },
          {
            type: 'FormattedSpan',
            text: '\t',
          },
        ],
      });
    });
  });

  describe('special characters handling', () => {
    it('should handle unicode characters', () => {
      const node: UnistNode = {
        type: 'text',
        value: '🚀 Unicode 中文 العربية',
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        text: '🚀 Unicode 中文 العربية',
      });
    });

    it('should handle HTML entities (if they exist in input)', () => {
      const node: UnistNode = {
        type: 'text',
        value: '&lt;script&gt;alert("xss")&lt;/script&gt;',
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        text: '&lt;script&gt;alert("xss")&lt;/script&gt;',
      });
    });

    it('should handle very long text', () => {
      const longText = 'a'.repeat(10000);
      const node: UnistNode = {
        type: 'text',
        value: longText,
      };

      const result = toFormattedText(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        text: longText,
      });
    });
  });

  describe('circular reference prevention', () => {
    it('should handle self-referencing structures (note: will cause stack overflow)', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'div',
        children: [],
      };

      // Create a circular reference
      node.children = [node];

      // This will cause a stack overflow, which is expected behavior
      // In a real implementation, you might want to add circular reference detection
      expect(() => {
        toFormattedText(node);
      }).toThrow('Maximum call stack size exceeded');
    });
  });

  describe('performance edge cases', () => {
    it('should handle deeply nested structures', () => {
      let node: UnistNode = {
        type: 'text',
        value: 'deep content',
      };

      // Create a deeply nested structure
      for (let i = 0; i < 100; i++) {
        node = {
          type: 'element',
          tagName: 'div',
          children: [node],
        };
      }

      const result = toFormattedText(node);
      expect(result).toBeDefined();
    });

    it('should handle wide structures with many siblings', () => {
      const children: UnistNode[] = [];
      for (let i = 0; i < 1000; i++) {
        children.push({
          type: 'text',
          value: `text ${i}`,
        });
      }

      const node: UnistNode = {
        type: 'root',
        children,
      };

      const result = toFormattedText(node);
      expect(result).toBeDefined();
      expect(result?.children).toHaveLength(1000);
    });
  });
});

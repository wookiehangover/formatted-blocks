import {
  FormattedText,
  FormattedSpan,
  UnistNode,
  Handler,
  HandlerList,
} from '../src/typings';

describe('Type Definitions', () => {
  describe('UnistNode', () => {
    it('should allow basic node structure', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'p',
        children: [],
        properties: {},
      };

      expect(node.type).toBe('element');
      expect(node.tagName).toBe('p');
      expect(node.children).toEqual([]);
      expect(node.properties).toEqual({});
    });

    it('should allow text node', () => {
      const node: UnistNode = {
        type: 'text',
        value: 'Hello world',
      };

      expect(node.type).toBe('text');
      expect(node.value).toBe('Hello world');
    });

    it('should allow minimal node', () => {
      const node: UnistNode = {
        type: 'root',
      };

      expect(node.type).toBe('root');
    });
  });

  describe('FormattedText', () => {
    it('should allow basic FormattedText structure', () => {
      const formattedText: FormattedText = {
        type: 'FormattedText',
        text: 'Hello world',
      };

      expect(formattedText.type).toBe('FormattedText');
      expect(formattedText.text).toBe('Hello world');
    });

    it('should allow FormattedText with spans', () => {
      const formattedText: FormattedText = {
        type: 'FormattedText',
        spans: [
          {
            type: 'FormattedSpan',
            text: 'Hello',
          },
        ],
      };

      expect(formattedText.type).toBe('FormattedText');
      expect(formattedText.spans).toHaveLength(1);
    });

    it('should allow FormattedText with children', () => {
      const formattedText: FormattedText = {
        type: 'FormattedText',
        children: [
          {
            type: 'FormattedText',
            text: 'Child',
          },
        ],
      };

      expect(formattedText.type).toBe('FormattedText');
      expect(formattedText.children).toHaveLength(1);
    });

    it('should allow FormattedText with tagName', () => {
      const formattedText: FormattedText = {
        type: 'FormattedText',
        tagName: 'h1',
        text: 'Title',
      };

      expect(formattedText.type).toBe('FormattedText');
      expect(formattedText.tagName).toBe('h1');
    });

    it('should allow additional properties', () => {
      const formattedText: FormattedText = {
        type: 'FormattedText',
        text: 'Hello',
        customProperty: 'custom value',
      };

      expect(formattedText.type).toBe('FormattedText');
      expect(formattedText.customProperty).toBe('custom value');
    });
  });

  describe('FormattedSpan', () => {
    it('should allow basic FormattedSpan structure', () => {
      const span: FormattedSpan = {
        type: 'FormattedSpan',
        text: 'Hello world',
      };

      expect(span.type).toBe('FormattedSpan');
      expect(span.text).toBe('Hello world');
    });

    it('should allow FormattedSpan with format options', () => {
      const span: FormattedSpan = {
        type: 'FormattedSpan',
        text: 'Bold text',
        format: {
          bold: true,
          italic: false,
        },
      };

      expect(span.format?.bold).toBe(true);
      expect(span.format?.italic).toBe(false);
    });

    it('should allow FormattedSpan with destination', () => {
      const span: FormattedSpan = {
        type: 'FormattedSpan',
        text: 'Link text',
        destination: {
          discriminator: 'WebDestination',
          url: 'https://example.com',
        },
      };

      expect(span.destination?.discriminator).toBe('WebDestination');
      expect(span.destination?.url).toBe('https://example.com');
    });

    it('should allow all format options', () => {
      const span: FormattedSpan = {
        type: 'FormattedSpan',
        text: 'Formatted text',
        format: {
          bold: true,
          italic: true,
          italics: true,
          link: true,
        },
      };

      expect(span.format?.bold).toBe(true);
      expect(span.format?.italic).toBe(true);
      expect(span.format?.italics).toBe(true);
      expect(span.format?.link).toBe(true);
    });
  });

  describe('Handler', () => {
    it('should allow handler function', () => {
      const handler: Handler = (_node: UnistNode) => ({
        type: 'FormattedText',
        text: 'Handled',
      });

      const result = handler({ type: 'element' });
      expect(result.type).toBe('FormattedText');
      expect(result.text).toBe('Handled');
    });
  });

  describe('HandlerList', () => {
    it('should allow handler list', () => {
      const handlers: HandlerList = {
        p: (_node: UnistNode) => ({
          type: 'FormattedText',
          tagName: 'p',
        }),
        em: (_node: UnistNode) => ({
          type: 'FormattedSpan',
          format: { italic: true },
        }),
      };

      expect(typeof handlers['p']).toBe('function');
      expect(typeof handlers['em']).toBe('function');

      const pResult = handlers['p']!({ type: 'element', tagName: 'p' });
      expect(pResult.type).toBe('FormattedText');
      expect(pResult.tagName).toBe('p');

      const emResult = handlers['em']!({ type: 'element', tagName: 'em' });
      expect(emResult.type).toBe('FormattedSpan');
      expect((emResult as any).format?.italic).toBe(true);
    });
  });
});

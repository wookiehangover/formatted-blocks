import handlers from '../src/handlers';
import { UnistNode } from '../src/typings/unist-node';

describe('handlers', () => {
  describe('emphasis handler (em)', () => {
    it('should create FormattedSpan with italic format', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'em',
      };

      const result = handlers.em(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        format: { italic: true },
      });
    });
  });

  describe('strong handler', () => {
    it('should create FormattedSpan with bold format', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'strong',
      };

      const result = handlers.strong(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        format: { bold: true },
      });
    });
  });

  describe('italic handler (i)', () => {
    it('should create FormattedSpan with italics format', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'i',
      };

      const result = handlers.i(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        format: { italics: true },
      });
    });
  });

  describe('bold handler (b)', () => {
    it('should create FormattedSpan with bold format', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'b',
      };

      const result = handlers.b(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        format: { bold: true },
      });
    });
  });

  describe('link handler (a)', () => {
    it('should create FormattedSpan with destination', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'a',
        properties: {
          href: 'https://example.com',
        },
      };

      const result = handlers.a(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        destination: {
          discriminator: 'WebDestination',
          url: 'https://example.com',
        },
      });
    });

    it('should handle missing href property', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'a',
        properties: {},
      };

      const result = handlers.a(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        destination: {
          discriminator: 'WebDestination',
          url: '',
        },
      });
    });

    it('should handle missing properties', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'a',
      };

      const result = handlers.a(node);

      expect(result).toEqual({
        type: 'FormattedSpan',
        destination: {
          discriminator: 'WebDestination',
          url: '',
        },
      });
    });
  });

  describe('paragraph handler (p)', () => {
    it('should create FormattedText with p tagName', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'p',
      };

      const result = handlers.p(node);

      expect(result).toEqual({
        type: 'FormattedText',
        tagName: 'p',
      });
    });

    it('should use default tagName when node.tagName is undefined', () => {
      const node: UnistNode = {
        type: 'element',
      };

      const result = handlers.p(node);

      expect(result).toEqual({
        type: 'FormattedText',
        tagName: 'p',
      });
    });
  });

  describe('heading handlers', () => {
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((tag) => {
      it(`should create FormattedText with ${tag} tagName`, () => {
        const node: UnistNode = {
          type: 'element',
          tagName: tag,
        };

        const result = handlers[tag](node);

        expect(result).toEqual({
          type: 'FormattedText',
          tagName: tag,
        });
      });
    });
  });

  describe('list handlers', () => {
    it('should create FormattedText for ul', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'ul',
      };

      const result = handlers.ul(node);

      expect(result).toEqual({
        type: 'FormattedText',
        tagName: 'ul',
      });
    });

    it('should create FormattedText for ol', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'ol',
      };

      const result = handlers.ol(node);

      expect(result).toEqual({
        type: 'FormattedText',
        tagName: 'ol',
      });
    });

    it('should create FormattedText for li', () => {
      const node: UnistNode = {
        type: 'element',
        tagName: 'li',
      };

      const result = handlers.li(node);

      expect(result).toEqual({
        type: 'FormattedText',
        tagName: 'li',
      });
    });
  });
});

// Mock the external dependencies to avoid ES module issues
jest.mock('mdast-util-to-hast', () => ({
  toHast: jest.fn((node) => ({
    type: 'root',
    children: node.children || [],
  })),
}));

import FormattedBlocks from '../src/compiler';

describe('FormattedBlocks compiler', () => {
  let mockProcessor: any;

  beforeEach(() => {
    mockProcessor = {
      Compiler: undefined,
    };
  });

  it('should set Compiler function on processor', () => {
    FormattedBlocks.call(mockProcessor);

    expect(mockProcessor.Compiler).toBeDefined();
    expect(typeof mockProcessor.Compiler).toBe('function');
  });

  it('should return FormattedText structure', () => {
    FormattedBlocks.call(mockProcessor);

    const mockNode = {
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

    const result = mockProcessor.Compiler(mockNode);

    expect(result).toEqual({
      type: 'FormattedText',
      children: expect.any(Array),
    });
  });

  it('should handle empty input', () => {
    FormattedBlocks.call(mockProcessor);

    const mockNode = {
      type: 'root',
      children: [],
    };

    const result = mockProcessor.Compiler(mockNode);

    expect(result).toEqual({
      type: 'FormattedText',
      children: [],
    });
  });

  it('should filter out null results from toFormattedText', () => {
    FormattedBlocks.call(mockProcessor);

    const mockNode = {
      type: 'root',
      children: [
        {
          type: 'text',
          value: '\n', // This should be filtered out
        },
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

    const result = mockProcessor.Compiler(mockNode);

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
});

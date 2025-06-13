export interface UnistNode {
  type: string;
  text?: string;
  value?: string;
  tagName?: string;
  element?: string;
  position?: unknown;
  children?: UnistNode[];
  properties?: {
    [index: string]: unknown;
  };
}

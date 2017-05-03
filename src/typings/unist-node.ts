export interface Children {
  [index: number]: UnistNode
  length: number
}

export interface UnistNode {
  type: string
  text?: string
  value?: string
  tagName?: string
  element?: string
  position?: any
  children?: Children
  properties?: {
    [index: string]: any
  };
}

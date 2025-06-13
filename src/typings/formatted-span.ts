import { UnistNode } from './unist-node';

export interface FormatOptions {
  bold?: boolean;
  italic?: boolean;
  italics?: boolean;
  link?: boolean;
}

export interface Destination {
  discriminator: string;
  url?: string;
}

export interface FormattedSpan extends UnistNode {
  readonly type: string;
  text?: string;
  format?: FormatOptions;
  destination?: Destination;
}

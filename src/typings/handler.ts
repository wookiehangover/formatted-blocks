import { FormattedText } from './formatted-text';
import { UnistNode } from './unist-node';

export type Handler = (node: UnistNode) => FormattedText;

export interface HandlerList {
  [index: string]: Handler;
}

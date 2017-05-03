import { FormattedSpan } from './formatted-span'

export interface Spans {
  [index: number]: FormattedSpan
}

export interface FormattedText {
  type: string;
  text?: string;
  spans?: Spans;
}

export interface FormattedText {
  type: string;
  text?: string;
  spans?: FormattedText[];
  children?: FormattedText[];
  tagName?: string;
  [key: string]: unknown;
}

export function trimLeadingWhitespacePerLine(text: string): string {
  return text.replace(/^\s+/gm, '');
}

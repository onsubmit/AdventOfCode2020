export default class LineParser {
  static toString = (line: string): string => line;
  static toNumber = (line: string): number => parseInt(line, 10);
}

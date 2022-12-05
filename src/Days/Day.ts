import FileReader from "../FileReader";

export type DayType<T> = new () => Day<T>;

export default abstract class Day<T> {
  private _lines?: T[];

  protected get lines(): T[] {
    if (!this._lines) {
      this._lines = this.parseInput();
    }

    return this._lines;
  }

  protected parseInput = (): T[] => {
    const lines = FileReader.getLines(this.relativeInputPath, this.parser);
    this.afterParse();

    return lines;
  };

  protected afterParse = (): void => {
    // No default implementation.
  };

  abstract relativeInputPath: string;
  abstract parser: (line: string) => T | undefined;

  abstract getPartOneSolution: () => number;
  abstract getPartTwoSolution: () => number;
}

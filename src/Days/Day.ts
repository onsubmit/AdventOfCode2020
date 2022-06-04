import FileReader from "../FileReader";

export type DayType<T> = new () => Day<T>;

export default abstract class Day<T> {
  private _lines?: T[];

  protected get lines(): T[] {
    if (!this._lines) {
      this._lines = FileReader.getLines(this.relativeInputPath, this.parser);
    }

    return this._lines;
  }

  abstract relativeInputPath: string;
  abstract parser: (line: string) => T;

  abstract getPartOneSolution: () => number;
  abstract getPartTwoSolution: () => number;
}

export default abstract class Day {
  protected lines: number[];

  protected constructor(lines: number[]) {
    this.lines = lines;
  }

  static initializeAsync: () => Promise<Day>;
  abstract getPartOneSolution: () => Promise<number>;
  abstract getPartTwoSolution: () => Promise<number>;
}

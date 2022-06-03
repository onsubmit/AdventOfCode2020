import IDay from "../IDay";

export default abstract class Day implements IDay {
  protected lines: number[];

  protected constructor(lines: number[]) {
    this.lines = lines;
  }

  static initializeAsync: () => Promise<Day>;
  abstract getPartOneSolution: () => Promise<number>;
  abstract getPartTwoSolution: () => Promise<number>;
}

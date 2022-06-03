import IDay from "../IDay";

export default abstract class Day<T> implements IDay {
  protected lines: T[];

  protected constructor(lines: T[]) {
    this.lines = lines;
  }

  abstract getPartOneSolution: () => Promise<number>;
  abstract getPartTwoSolution: () => Promise<number>;
}

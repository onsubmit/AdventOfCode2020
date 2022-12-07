import LineParser from "../LineParser";
import Day from "./Day";

export default class Day06 extends Day<string> {
  relativeInputPath = `../input/${Day06.name}.txt`;
  parser = LineParser.toString;

  getPartOneSolution = (): number => {
    let sum = 0;
    for (let i = 0; i < this.lines.length; i++) {
      const uniqueAnsweredQuestions: Set<string> = new Set();
      while (this.lines[i]) {
        [...this.lines[i]].forEach((c) => uniqueAnsweredQuestions.add(c));
        i++;
      }

      sum += uniqueAnsweredQuestions.size;
    }

    return sum;
  };

  getPartTwoSolution = (): number => {
    return 0;
  };
}

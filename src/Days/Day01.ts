import LineParser from "../LineParser";
import Day from "./Day";

export default class Day01 extends Day<number> {
  relativeInputPath = `../input/${Day01.name}.txt`;
  parser = LineParser.toNumber;

  getPartOneSolution = (): number => {
    for (let i = 0; i < this.lines.length; i++) {
      for (let j = 0; j < this.lines.length; j++) {
        if (i === j) {
          continue;
        }

        const x = this.lines[i];
        const y = this.lines[j];

        if (x + y === 2020) {
          return x * y;
        }
      }
    }

    throw new Error("No solution found");
  };

  getPartTwoSolution = (): number => {
    for (let i = 0; i < this.lines.length; i++) {
      for (let j = 0; j < this.lines.length; j++) {
        if (i === j) {
          continue;
        }

        const x = this.lines[i];
        const y = this.lines[j];
        let sum = x + y;

        if (sum > 2020) {
          continue;
        }

        for (let k = 0; k < this.lines.length; k++) {
          if (i === k || j === k) {
            continue;
          }

          const z = this.lines[k];

          if (sum + z === 2020) {
            return x * y * z;
          }
        }
      }
    }

    throw new Error("No solution found");
  };
}

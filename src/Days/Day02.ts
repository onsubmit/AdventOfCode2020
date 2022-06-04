import LineParser from "../LineParser";
import Day from "./Day";

export default class Day02 extends Day<number> {
  relativeInputPath = `../input/${Day02.name}.txt`;
  parser = LineParser.toNumber;

  getPartOneSolution = (): number => {
    return 0;
    throw new Error("No solution found");
  };

  getPartTwoSolution = (): number => {
    return 0;
    throw new Error("No solution found");
  };
}

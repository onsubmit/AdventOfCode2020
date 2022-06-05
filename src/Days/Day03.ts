import Day from "./Day";

const dx = 3;
const dy = 1;

export default class Day03 extends Day<boolean[]> {
  relativeInputPath = `../input/${Day03.name}.txt`;
  parser = parseLine;

  getPartOneSolution = (): number => {
    let x = 0;
    let numTrees = 0;
    for (let y = 0; y < this.lines.length; y += dy) {
      const line = this.lines[y];
      const isTree = line[x];
      if (isTree) {
        numTrees++;
      }

      x = (x + dx) % line.length;
    }

    return numTrees;
  };

  getPartTwoSolution = (): number => {
    return 0;
  };
}

function parseLine(line: string): boolean[] {
  return line.split("").map((c) => c === "#");
}

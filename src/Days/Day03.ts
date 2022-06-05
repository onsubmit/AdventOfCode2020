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
    const slopes = [
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 5, y: 1 },
      { x: 7, y: 1 },
      { x: 1, y: 2 },
    ];

    let product = 1;
    slopes.forEach((slope) => {
      let x = 0;
      let numTrees = 0;
      for (let y = 0; y < this.lines.length; y += slope.y) {
        const line = this.lines[y];
        const isTree = line[x];
        if (isTree) {
          numTrees++;
        }

        x = (x + slope.x) % line.length;
      }

      product *= numTrees;
    });

    return product;
  };
}

function parseLine(line: string): boolean[] {
  return line.split("").map((c) => c === "#");
}

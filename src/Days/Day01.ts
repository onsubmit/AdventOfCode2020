import FileReader from "../FileReader";
import IDay from "../IDay";
import LineParser from "../LineParser";

class Day01 implements IDay {
  getSolution = async (): Promise<number> => {
    const lines = await FileReader.getLines("../input/Day01.txt", LineParser.toNumber);

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines.length; j++) {
        if (i === j) {
          continue;
        }

        const x = lines[i];
        const y = lines[j];

        if (x + y === 2020) {
          return x * y;
        }
      }
    }

    throw new Error("No solution found");
  };
}

export default new Day01();

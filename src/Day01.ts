import fs from "fs";
import path from "path";
import readline from "readline";
import events from "events";

class Day01 {
  go = async () => {
    const input = fs.createReadStream(
      path.resolve(__dirname, "../input/Day01.txt")
    );

    const rl = readline.createInterface({ input, crlfDelay: Infinity });

    const lines: number[] = [];
    rl.on("line", (line) => lines.push(parseInt(line, 10)));

    await events.once(rl, "close");

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

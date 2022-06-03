import events from "events";
import fs from "fs";
import path from "path";
import readline from "readline";

export default class FileReader {
  static getLines = async <T>(relativePath: string, parser: (line: string) => T): Promise<T[]> => {
    const inputPath = path.resolve(__dirname, relativePath);
    const input = fs.createReadStream(inputPath);
    const rl = readline.createInterface({ input });

    const lines: T[] = [];
    rl.on("line", (line) => lines.push(parser(line)));

    await events.once(rl, "close");
    return lines;
  };
}

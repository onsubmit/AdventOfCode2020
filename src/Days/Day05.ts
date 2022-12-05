import LineParser from "../LineParser";
import Day from "./Day";

type Range = {
  min: number;
  max: number;
};

export default class Day05 extends Day<string> {
  private readonly _maxRows = 127;
  private readonly _maxSeats = 7;
  private readonly _numRowChars = 7;
  private readonly _numSeatChars = 3;

  constructor() {
    super();
    this.parseInput();
  }

  relativeInputPath = `../input/${Day05.name}.txt`;
  parser = LineParser.toString;

  getPartOneSolution = (): number => {
    const initialRowRange: Range = {
      min: 0,
      max: this._maxRows,
    };

    const initialSeatRange: Range = {
      min: 0,
      max: this._maxSeats,
    };

    let maxSeatId = Number.MIN_VALUE;

    for (const line of this.lines) {
      const rowChars = line.substring(0, this._numRowChars);
      const seatChars = line.substring(this._numRowChars, this._numRowChars + this._numSeatChars);
      const finalRowRange = [...rowChars].reduce((accumulator, character) => {
        return Day05.getAccumulatedRange(accumulator, character, "F");
      }, initialRowRange);

      if (finalRowRange.min !== finalRowRange.max) {
        throw new Error("Final row range should include a single row.");
      }

      const finalSeatRange = [...seatChars].reduce((accumulator, character) => {
        return Day05.getAccumulatedRange(accumulator, character, "L");
      }, initialSeatRange);

      if (finalSeatRange.min !== finalSeatRange.max) {
        throw new Error("Final seat range should include a single seat.");
      }

      const row = finalRowRange.min;
      const seat = finalSeatRange.min;
      const seatId = row * 8 + seat;
      maxSeatId = Math.max(maxSeatId, seatId);
    }

    return maxSeatId;
  };

  getPartTwoSolution = (): number => {
    return 0;
  };

  private static getAccumulatedRange(accumulator: Range, character: string, lowerHalf: string): Range {
    const average = Math.floor((accumulator.max - accumulator.min) / 2);
    return character === lowerHalf
      ? {
          min: accumulator.min,
          max: accumulator.min + average,
        }
      : {
          min: accumulator.min + average + 1,
          max: accumulator.max,
        };
  }
}

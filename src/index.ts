import { DayType } from "./Days/Day";
import Day01 from "./Days/Day01";
import Day02 from "./Days/Day02";

const days: DayType<any>[] = [Day01, Day02];

days.forEach(async (Day, i) => {
  const day = new Day();
  const solution1 = day.getPartOneSolution();
  const solution2 = day.getPartTwoSolution();
  console.log(`Day ${i + 1}, part 1: ${solution1}`);
  console.log(`Day ${i + 1}, part 2: ${solution2}`);
});

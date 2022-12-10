import Day01 from "./Days/Day01";
import Day02 from "./Days/Day02";
import Day03 from "./Days/Day03";
import Day04 from "./Days/Day04";
import Day05 from "./Days/Day05";
import Day06 from "./Days/Day06";
import Day07 from "./Days/Day07";

[Day01, Day02, Day03, Day04, Day05, Day06, Day07].forEach(async (Day, i) => {
  const day = new Day();
  const solution1 = day.getPartOneSolution();
  const solution2 = day.getPartTwoSolution();
  console.log(`Day ${i + 1}, part 1: ${solution1}`);
  console.log(`Day ${i + 1}, part 2: ${solution2}`);
});

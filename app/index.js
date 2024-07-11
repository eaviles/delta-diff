const { program } = require("commander");
const ms = require("humanize-ms");

function msm(line) {
  return line.split(" ").reduce((acc, item) => acc + ms(item), 0);
}

program
  .argument("before")
  .argument("after")
  .option("-t, --time", "is a time diff", false)
  .action((before, after, { time }) => {
    const beforeVal = !time ? Number(before) : msm(before);
    const afterVal = !time ? Number(after) : msm(after);
    const diff = afterVal / beforeVal;
    const diff2 = 100.0 * (beforeVal / afterVal - 1.0);
    console.warn(diff, diff2.toFixed(2));
    if (diff > 1.0) {
      const prc = (diff - 1.0) * 100;
      console.log(`${prc.toFixed(1)}% ${time ? "slower" : "larger"}`);
      console.log(`${diff2.toFixed(0)}% change`);
    } else {
      const prc = (1.0 - diff) * 100;
      console.log(`${prc.toFixed(0)}% ${time ? "faster" : "smaller"}`);
      console.log(`${diff2.toFixed(0)}% improvement`);
    }
  })
  .parse();

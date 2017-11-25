const cowsay = require("cowsay"),
      chalk = require("chalk"),
      sentence  = require("./sentence");

console.log(chalk.blue("cow will say something to you"));
console.log(chalk.keyword("green").bold(cowsay.say({
  text : sentence(),
  e: "oO",
  T: "U "
})));

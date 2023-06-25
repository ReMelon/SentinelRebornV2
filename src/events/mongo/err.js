const chalk = require("chalk");
const { connected } = require("mongoose");

module.exports = {
  name: "err",
  execute(err) {
    console.log(chalk.red(`[MONGO ERROR]\n${err}`));
  },
};

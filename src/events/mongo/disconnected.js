const chalk = require("chalk");
const { connected } = require("mongoose");

module.exports = {
  name: "disconnected",
  execute() {
    console.log(chalk.red("[MONGO] Disconnected"));
  },
};

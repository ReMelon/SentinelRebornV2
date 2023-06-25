const chalk = require("chalk");
const { connected } = require("mongoose");

module.exports = {
  name: "connecting",
  async execute() {
    console.log(chalk.cyan("[MONGO] Connecting..."));
  },
};

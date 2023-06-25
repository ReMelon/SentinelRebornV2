const chalk = require("chalk");
const { connected } = require("mongoose");

module.exports = {
  name: "connected",
  execute() {
    console.log(chalk.blue("[MONGO] Connected"));
  },
};

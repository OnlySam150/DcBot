const chalk = require("chalk");

const log = (level, message, options = {}) => {
  let formattedMessage = `[${level}] - ${message}`;

  if (options.bold) {
    formattedMessage = chalk.bold(formattedMessage);
  }

  if (options.underline) {
    formattedMessage = chalk.underline(formattedMessage);
  }

  if (options.italic) {
    formattedMessage = chalk.italic(formattedMessage);
  }

  switch (level) {
    case "INFO":
      console.log(chalk.green(formattedMessage));
      break;
    case "WARN":
      console.log(chalk.yellow(formattedMessage));
      break;
    case "ERROR":
      console.log(chalk.red(formattedMessage));
      break;
    case "MYSQL":
      console.log(chalk.blue(formattedMessage));
      break;
    default:
      console.log(formattedMessage);
  }
};

const info = (message, options = {}) => log("INFO", message, options);
const warn = (message, options = {}) => log("WARN", message, options);
const error = (message, options = {}) => log("ERROR", message, options);
const mysql = (message, options = {}) => log("MYSQL", message, options);

module.exports = {
  info,
  warn,
  error,
  mysql,
};

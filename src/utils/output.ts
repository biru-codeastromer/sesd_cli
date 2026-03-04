import chalk from 'chalk';

export class Output {
  static title(message: string): void {
    console.log(chalk.bold.cyan(`\n${message}`));
  }

  static info(message: string): void {
    console.log(chalk.blue(`ℹ ${message}`));
  }

  static success(message: string): void {
    console.log(chalk.green(`✔ ${message}`));
  }

  static warn(message: string): void {
    console.log(chalk.yellow(`⚠ ${message}`));
  }

  static error(message: string): void {
    console.error(chalk.red(`✖ ${message}`));
  }
}

import { CliCommand } from '../models/command';
import { Command } from 'commander';

export class CommandRegistry {
  constructor(private readonly commands: CliCommand[]) {}

  registerAll(program: Command): void {
    this.commands.forEach((command) => command.register(program));
  }
}

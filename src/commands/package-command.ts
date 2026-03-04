import { Command } from 'commander';
import { CliCommand } from '../models/command';
import { NpmService } from '../services/npm-service';
import { Output } from '../utils/output';
import { ErrorHandler } from '../utils/error-handler';

export class PackageCommand implements CliCommand {
  constructor(private readonly npmService: NpmService) {}
  register(program: Command): void {
    program.command('package <name>').description('Show npm package metadata')
      .action(async (name: string) => {
        try {
          const pkg = await this.npmService.getPackage(name);
          Output.title(`npm package: ${pkg.name}`);
          Output.info(`Latest version: ${pkg['dist-tags'].latest}`);
          Output.info(`Description: ${pkg.description ?? 'N/A'}`);
          Output.info(`Maintainers: ${pkg.maintainers?.map((m) => m.name).join(', ') ?? 'N/A'}`);
        } catch (error: unknown) { Output.error(ErrorHandler.getMessage(error, 'Failed to fetch package')); }
      });
  }
}

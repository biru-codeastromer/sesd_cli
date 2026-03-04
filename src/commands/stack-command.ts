import { Command } from 'commander';
import { CliCommand } from '../models/command';
import { StackService } from '../services/stack-service';
import { Output } from '../utils/output';
import { Validator } from '../utils/validators';
import { ErrorHandler } from '../utils/error-handler';

export class StackCommand implements CliCommand {
  constructor(private readonly stackService: StackService) {}
  register(program: Command): void {
    program.command('stack <tag>').description('Fetch trending StackOverflow questions by tag').option('-l, --limit <limit>', 'Number of questions', '5')
      .action(async (tag: string, options: { limit: string }) => {
        try {
          const limit = Validator.positiveInt(options.limit, 'limit', 10);
          const items = await this.stackService.getTrendingQuestions(tag, limit);
          Output.title(`Top StackOverflow threads for #${tag}`);
          items.forEach((item, index) => Output.info(`${index + 1}. (${item.score}★) ${item.title}\n   ${item.link}`));
        } catch (error: unknown) { Output.error(ErrorHandler.getMessage(error, 'Failed to fetch stack data')); }
      });
  }
}

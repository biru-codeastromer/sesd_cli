import { Command } from 'commander';
import { CliCommand } from '../models/command';
import { QuoteService } from '../services/quote-service';
import { Output } from '../utils/output';
import { ErrorHandler } from '../utils/error-handler';

export class QuoteCommand implements CliCommand {
  constructor(private readonly quoteService: QuoteService) {}

  register(program: Command): void {
    program
      .command('quote')
      .description('Get a random developer-friendly quote')
      .option('-t, --tag <tag>', 'Filter quotes by tag', 'technology')
      .action(async (options: { tag: string }) => {
        try {
          const quote = await this.quoteService.getRandomQuote(options.tag);
          Output.title('Quote of the Moment');
          Output.info(`“${quote.content}”`);
          Output.success(`— ${quote.author}`);
        } catch (error: unknown) {
          Output.error(ErrorHandler.getMessage(error, 'Failed to fetch quote'));
        }
      });
  }
}

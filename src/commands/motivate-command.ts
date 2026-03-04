import { Command } from 'commander';
import { CliCommand } from '../models/command';
import { QuoteService } from '../services/quote-service';
import { Output } from '../utils/output';
import { ErrorHandler } from '../utils/error-handler';

export class MotivateCommand implements CliCommand {
  constructor(private readonly quoteService: QuoteService) {}
  register(program: Command): void {
    program.command('motivate').description('Get a motivational message for developers')
      .action(async () => {
        try {
          const quote = await this.quoteService.getRandomQuote('inspirational|success');
          Output.title('Daily Motivation');
          Output.success(`“${quote.content}” — ${quote.author}`);
        } catch (error: unknown) { Output.error(ErrorHandler.getMessage(error, 'Failed to get motivation')); }
      });
  }
}

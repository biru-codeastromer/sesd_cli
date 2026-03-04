import { Command } from 'commander';
import { CliCommand } from '../models/command';
import { AiTipService } from '../services/ai-tip-service';
import { Output } from '../utils/output';
import { ErrorHandler } from '../utils/error-handler';

export class AiCommand implements CliCommand {
  constructor(private readonly aiTipService: AiTipService) {}
  register(program: Command): void {
    program.command('ai <question...>').description('Get an AI-style programming tip')
      .action(async (questionParts: string[]) => {
        try {
          const question = questionParts.join(' ');
          const tip = await this.aiTipService.getTip(question);
          Output.title('AI Dev Tip');
          Output.info(tip);
        } catch (error: unknown) { Output.error(ErrorHandler.getMessage(error, 'Failed to get AI tip')); }
      });
  }
}

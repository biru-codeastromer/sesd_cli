import { Command } from 'commander';
import { CliCommand } from '../models/command';
import { NewsService } from '../services/news-service';
import { Output } from '../utils/output';
import { Validator } from '../utils/validators';
import { ErrorHandler } from '../utils/error-handler';

export class TechNewsCommand implements CliCommand {
  constructor(private readonly newsService: NewsService) {}
  register(program: Command): void {
    program.command('technews').description('Read top Hacker News stories').option('-l, --limit <limit>', 'Number of stories', '5')
      .action(async (options: { limit: string }) => {
        try {
          const limit = Validator.positiveInt(options.limit, 'limit', 10);
          const stories = await this.newsService.getTopStories(limit);
          Output.title('Top Hacker News Stories');
          stories.forEach((story, index) => Output.info(`${index + 1}. ${story.title} (${story.score} points)\n   ${story.url ?? 'https://news.ycombinator.com/item?id=' + story.id}`));
        } catch (error: unknown) { Output.error(ErrorHandler.getMessage(error, 'Failed to fetch tech news')); }
      });
  }
}

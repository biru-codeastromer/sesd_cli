import { Command } from 'commander';
import { CliCommand } from '../models/command';
import { NewsService } from '../services/news-service';
import { QuoteService } from '../services/quote-service';
import { WeatherService } from '../services/weather-service';
import { Output } from '../utils/output';
import { ErrorHandler } from '../utils/error-handler';

export class TodayCommand implements CliCommand {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly newsService: NewsService,
    private readonly quoteService: QuoteService
  ) {}

  register(program: Command): void {
    program.command('today').description('Developer dashboard: weather + news + motivation').requiredOption('-c, --city <city>', 'City for weather')
      .action(async (options: { city: string }) => {
        try {
          const [weather, stories, quote] = await Promise.all([
            this.weatherService.getWeather(options.city),
            this.newsService.getTopStories(3),
            this.quoteService.getRandomQuote('technology')
          ]);
          Output.title('Developer Dashboard');
          Output.info(`Weather ${weather.name}: ${weather.main.temp}°C, ${weather.weather[0]?.description ?? 'Unknown'}`);
          Output.info(`Top News: ${stories[0]?.title ?? 'No stories available'}`);
          Output.success(`Motivation: “${quote.content}” — ${quote.author}`);
        } catch (error: unknown) { Output.error(ErrorHandler.getMessage(error, 'Failed to build dashboard')); }
      });
  }
}

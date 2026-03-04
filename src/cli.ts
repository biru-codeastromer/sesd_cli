#!/usr/bin/env node
import { Command } from 'commander';
import { configureEnvironment } from './utils/environment';
import { CommandRegistry } from './commands/registry';
import { GithubCommand } from './commands/github-command';
import { RepoCommand } from './commands/repo-command';
import { GitHubService } from './services/github-service';
import { WeatherService } from './services/weather-service';
import { WeatherCommand } from './commands/weather-command';
import { QuoteService } from './services/quote-service';
import { QuoteCommand } from './commands/quote-command';
import { StackCommand } from './commands/stack-command';
import { StackService } from './services/stack-service';
import { NewsService } from './services/news-service';
import { TechNewsCommand } from './commands/technews-command';
import { NpmService } from './services/npm-service';
import { PackageCommand } from './commands/package-command';
import { MotivateCommand } from './commands/motivate-command';
import { AiTipService } from './services/ai-tip-service';
import { AiCommand } from './commands/ai-command';
import { TodayCommand } from './commands/today-command';

configureEnvironment();

const program = new Command();

program
  .name('devintel')
  .description('DevIntel CLI: a developer intelligence and productivity command line assistant')
  .version('1.0.0')
  .showHelpAfterError()
  .configureOutput({
    outputError: (str: string, write: (message: string) => void) => write(`ERROR: ${str}`)
  });

const gitHubService = new GitHubService();

const weatherService = new WeatherService(process.env.OPENWEATHER_API_KEY);
const quoteService = new QuoteService();
const stackService = new StackService();
const newsService = new NewsService();
const npmService = new NpmService();
const aiTipService = new AiTipService();

const registry = new CommandRegistry([
  new GithubCommand(gitHubService),
  new RepoCommand(gitHubService),
  new WeatherCommand(weatherService),
  new QuoteCommand(quoteService),
  new StackCommand(stackService),
  new TechNewsCommand(newsService),
  new PackageCommand(npmService),
  new MotivateCommand(quoteService),
  new AiCommand(aiTipService),
  new TodayCommand(weatherService, newsService, quoteService)
]);
registry.registerAll(program);

program.parseAsync(process.argv).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Unexpected error');
  process.exit(1);
});

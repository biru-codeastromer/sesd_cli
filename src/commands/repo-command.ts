import { Command } from 'commander';
import { CliCommand } from '../models/command';
import { GitHubService } from '../services/github-service';
import { Output } from '../utils/output';
import { ErrorHandler } from '../utils/error-handler';
import { Validator } from '../utils/validators';

export class RepoCommand implements CliCommand {
  constructor(private readonly githubService: GitHubService) {}

  register(program: Command): void {
    program
      .command('repo <repoSlug>')
      .description('Show GitHub repository insights and stats')
      .action(async (repoSlug: string) => {
        try {
          Validator.repoSlug(repoSlug);
          const repo = await this.githubService.getRepo(repoSlug);
          Output.title(`Repository: ${repo.full_name}`);
          Output.info(`Stars: ${repo.stargazers_count}`);
          Output.info(`Forks: ${repo.forks_count}`);
          Output.info(`Open issues: ${repo.open_issues_count}`);
          Output.info(`Primary language: ${repo.language ?? 'Unknown'}`);
          Output.info(`Last updated: ${new Date(repo.updated_at).toLocaleString()}`);
        } catch (error: unknown) {
          Output.error(ErrorHandler.getMessage(error, 'Failed to fetch repository'));
        }
      });
  }
}

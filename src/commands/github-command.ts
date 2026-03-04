import { Command } from 'commander';
import { CliCommand } from '../models/command';
import { GitHubService } from '../services/github-service';
import { Output } from '../utils/output';
import { ErrorHandler } from '../utils/error-handler';
import { Validator } from '../utils/validators';

export class GithubCommand implements CliCommand {
  constructor(private readonly githubService: GitHubService) {}

  register(program: Command): void {
    program
      .command('github <username>')
      .description('Fetch GitHub profile analytics')
      .action(async (username: string) => {
        try {
          Validator.required(username, 'username');
          const user = await this.githubService.getUser(username);
          Output.title(`GitHub Profile: ${user.login}`);
          Output.info(`Name: ${user.name ?? 'N/A'}`);
          Output.info(`Bio: ${user.bio ?? 'N/A'}`);
          Output.info(`Public repos: ${user.public_repos}`);
          Output.info(`Followers/Following: ${user.followers}/${user.following}`);
          Output.info(`Member since: ${new Date(user.created_at).toLocaleDateString()}`);
        } catch (error: unknown) {
          Output.error(ErrorHandler.getMessage(error, 'Failed to fetch GitHub profile'));
        }
      });
  }
}

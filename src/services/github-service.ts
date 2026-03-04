import axios, { AxiosInstance } from 'axios';

export interface GitHubProfile {
  login: string;
  name: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string | null;
}

export interface GitHubRepo {
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  updated_at: string;
}

export class GitHubService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.github.com',
      timeout: 8000,
      headers: { Accept: 'application/vnd.github+json' }
    });
  }

  async getUser(username: string): Promise<GitHubProfile> {
    const response = await this.client.get<GitHubProfile>(`/users/${username}`);
    return response.data;
  }

  async getRepo(repoSlug: string): Promise<GitHubRepo> {
    const response = await this.client.get<GitHubRepo>(`/repos/${repoSlug}`);
    return response.data;
  }
}

import axios, { AxiosInstance } from 'axios';

interface QuoteResponse {
  content: string;
  author: string;
  tags: string[];
}

export class QuoteService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({ baseURL: 'https://api.quotable.io', timeout: 8000 });
  }

  async getRandomQuote(tag?: string): Promise<QuoteResponse> {
    const response = await this.client.get<QuoteResponse>('/random', {
      params: tag ? { tags: tag } : {}
    });
    return response.data;
  }
}

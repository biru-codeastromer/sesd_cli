import axios from 'axios';

interface StackQuestion {
  title: string;
  score: number;
  link: string;
}

interface StackResponse {
  items: StackQuestion[];
}

export class StackService {
  async getTrendingQuestions(tag: string, limit = 5): Promise<StackQuestion[]> {
    const response = await axios.get<StackResponse>('https://api.stackexchange.com/2.3/questions', {
      params: {
        order: 'desc',
        sort: 'votes',
        tagged: tag,
        site: 'stackoverflow',
        pagesize: limit
      },
      timeout: 8000
    });

    return response.data.items;
  }
}

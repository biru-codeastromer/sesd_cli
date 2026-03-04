import axios from 'axios';

interface HNItem {
  id: number;
  title: string;
  score: number;
  by: string;
  url?: string;
}

export class NewsService {
  async getTopStories(limit = 5): Promise<HNItem[]> {
    const topIds = await axios.get<number[]>('https://hacker-news.firebaseio.com/v0/topstories.json', { timeout: 8000 });
    const ids = topIds.data.slice(0, limit);
    return Promise.all(ids.map(async (id: number) => {
      const story = await axios.get<HNItem>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { timeout: 8000 });
      return story.data;
    }));
  }
}

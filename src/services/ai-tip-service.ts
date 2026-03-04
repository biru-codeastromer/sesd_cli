import axios from 'axios';

interface DuckResponse {
  AbstractText: string;
  RelatedTopics: Array<{ Text?: string }>;
}

export class AiTipService {
  async getTip(question: string): Promise<string> {
    const response = await axios.get<DuckResponse>('https://api.duckduckgo.com/', {
      params: { q: `${question} programming best practices`, format: 'json', no_redirect: 1, no_html: 1 },
      timeout: 8000
    });
    return response.data.AbstractText || response.data.RelatedTopics[0]?.Text || 'Break problems into small testable pieces and iterate quickly.';
  }
}

import axios from 'axios';

interface NpmMeta {
  name: string;
  description?: string;
  'dist-tags': { latest: string };
  maintainers?: Array<{ name: string }>;
  time?: Record<string, string>;
}

export class NpmService {
  async getPackage(name: string): Promise<NpmMeta> {
    const response = await axios.get<NpmMeta>(`https://registry.npmjs.org/${encodeURIComponent(name)}`, { timeout: 8000 });
    return response.data;
  }
}

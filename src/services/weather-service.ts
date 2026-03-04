import axios, { AxiosInstance } from 'axios';

interface OpenWeatherResponse {
  name: string;
  weather: Array<{ description: string }>;
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
}

export class WeatherService {
  private readonly client: AxiosInstance;
  constructor(private readonly apiKey: string | undefined) {
    this.client = axios.create({ baseURL: 'https://api.openweathermap.org/data/2.5', timeout: 8000 });
  }

  async getWeather(city: string, units: 'metric' | 'imperial' = 'metric'): Promise<OpenWeatherResponse> {
    if (!this.apiKey) {
      throw new Error('OPENWEATHER_API_KEY is not configured.');
    }

    const response = await this.client.get<OpenWeatherResponse>('/weather', {
      params: { q: city, appid: this.apiKey, units }
    });

    return response.data;
  }
}

import { Command } from 'commander';
import { CliCommand } from '../models/command';
import { WeatherService } from '../services/weather-service';
import { Output } from '../utils/output';
import { ErrorHandler } from '../utils/error-handler';
import { Validator } from '../utils/validators';

export class WeatherCommand implements CliCommand {
  constructor(private readonly weatherService: WeatherService) {}

  register(program: Command): void {
    program
      .command('weather <city>')
      .description('Fetch current weather for a city')
      .option('-u, --units <units>', 'Units: metric or imperial', 'metric')
      .action(async (city: string, options: { units: 'metric' | 'imperial' }) => {
        try {
          Validator.required(city, 'city');
          Validator.oneOf(options.units, ['metric', 'imperial'], 'units');
          const weather = await this.weatherService.getWeather(city, options.units);
          const unitLabel = options.units === 'imperial' ? '°F' : '°C';

          Output.title(`Weather in ${weather.name}`);
          Output.info(`Conditions: ${weather.weather[0]?.description ?? 'Unknown'}`);
          Output.info(`Temperature: ${weather.main.temp}${unitLabel}`);
          Output.info(`Feels like: ${weather.main.feels_like}${unitLabel}`);
          Output.info(`Humidity: ${weather.main.humidity}%`);
          Output.info(`Wind speed: ${weather.wind.speed} ${options.units === 'imperial' ? 'mph' : 'm/s'}`);
        } catch (error: unknown) {
          Output.error(ErrorHandler.getMessage(error, 'Failed to fetch weather'));
        }
      });
  }
}

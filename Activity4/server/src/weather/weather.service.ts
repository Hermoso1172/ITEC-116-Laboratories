import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  async getWeather(q: string) {
    const apiKey = this.configService.get<string>('WEATHER_API');
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('http://api.weatherapi.com/v1/forecast.json', {
          params: {
            key: apiKey,
            q: q,
          },
        }),
      );
      return data;
    } catch (error) {
      if (error.response) {
        console.log(error);
        const { status, data } = error.response;
        throw new HttpException(data, status);
      }
      throw new HttpException('Failed to fetch weather data', 500);
    }
  }
}

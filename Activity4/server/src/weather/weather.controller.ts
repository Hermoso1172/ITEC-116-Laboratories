import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { WeatherDto } from './dto/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch weather' })
  @ApiResponse({
    status: 200,
    description: 'Weather fetched successfully.',
    type: WeatherDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'q',
    required: true,
    type: Number,
    description:
      'Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name.',
  })
  getWeather(@Query('q') q: string) {
    return this.weatherService.getWeather(q);
  }
}

import { ApiProperty } from '@nestjs/swagger';

class LocationDto {
  @ApiProperty() name: string;
  @ApiProperty() region: string;
  @ApiProperty() country: string;
  @ApiProperty() lat: number;
  @ApiProperty() lon: number;
  @ApiProperty() tz_id: string;
  @ApiProperty() localtime_epoch: number;
  @ApiProperty() localtime: string;
}

class ConditionDto {
  @ApiProperty() text: string;
  @ApiProperty() icon: string;
  @ApiProperty() code: number;
}

class AirQualityDto {
  @ApiProperty() co: number;
  @ApiProperty() no2: number;
  @ApiProperty() o3: number;
  @ApiProperty() so2: number;
  @ApiProperty({ name: 'pm2_5' }) pm2_5: number;
  @ApiProperty() pm10: number;
  @ApiProperty({ name: 'us-epa-index' }) usEpaIndex: number;
  @ApiProperty({ name: 'gb-defra-index' }) gbDefraIndex: number;
}

class CurrentDto {
  @ApiProperty() last_updated_epoch: number;
  @ApiProperty() last_updated: string;
  @ApiProperty() temp_c: number;
  @ApiProperty() temp_f: number;
  @ApiProperty() is_day: number;
  @ApiProperty({ type: ConditionDto }) condition: ConditionDto;
  @ApiProperty() wind_mph: number;
  @ApiProperty() wind_kph: number;
  @ApiProperty() wind_degree: number;
  @ApiProperty() wind_dir: string;
  @ApiProperty() pressure_mb: number;
  @ApiProperty() pressure_in: number;
  @ApiProperty() precip_mm: number;
  @ApiProperty() precip_in: number;
  @ApiProperty() humidity: number;
  @ApiProperty() cloud: number;
  @ApiProperty() feelslike_c: number;
  @ApiProperty() feelslike_f: number;
  @ApiProperty() vis_km: number;
  @ApiProperty() vis_miles: number;
  @ApiProperty() uv: number;
  @ApiProperty() gust_mph: number;
  @ApiProperty() gust_kph: number;
  @ApiProperty({ type: AirQualityDto }) air_quality: AirQualityDto;
}

class DayDto {
  @ApiProperty() maxtemp_c: number;
  @ApiProperty() maxtemp_f: number;
  @ApiProperty() mintemp_c: number;
  @ApiProperty() mintemp_f: number;
  @ApiProperty() avgtemp_c: number;
  @ApiProperty() avgtemp_f: number;
  @ApiProperty() maxwind_mph: number;
  @ApiProperty() maxwind_kph: number;
  @ApiProperty() totalprecip_mm: number;
  @ApiProperty() totalprecip_in: number;
  @ApiProperty() avgvis_km: number;
  @ApiProperty() avgvis_miles: number;
  @ApiProperty() avghumidity: number;
  @ApiProperty() daily_will_it_rain: number;
  @ApiProperty() daily_chance_of_rain: number;
  @ApiProperty() daily_will_it_snow: number;
  @ApiProperty() daily_chance_of_snow: number;
  @ApiProperty({ type: ConditionDto }) condition: ConditionDto;
  @ApiProperty() uv: number;
}

class AstroDto {
  @ApiProperty() sunrise: string;
  @ApiProperty() sunset: string;
  @ApiProperty() moonrise: string;
  @ApiProperty() moonset: string;
  @ApiProperty() moon_phase: string;
  @ApiProperty() moon_illumination: string;
}

class ForecastDayDto {
  @ApiProperty() date: string;
  @ApiProperty() date_epoch: number;
  @ApiProperty({ type: DayDto }) day: DayDto;
  @ApiProperty({ type: AstroDto }) astro: AstroDto;
}

class ForecastDto {
  @ApiProperty({ type: [ForecastDayDto] }) forecastday: ForecastDayDto[];
}

export class WeatherDto {
  @ApiProperty({ type: LocationDto }) location: LocationDto;
  @ApiProperty({ type: CurrentDto }) current: CurrentDto;
  @ApiProperty({ type: ForecastDto }) forecast: ForecastDto;
}

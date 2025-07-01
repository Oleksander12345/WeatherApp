export interface WeatherData {
  name: string;
  temperature: number;
  icon: string;
  description: string;
  lat: number;
  lon: number;
}

export interface WeatherState {
  cities: string[];
  weatherByCity: Record<string, WeatherData>;
  error: string | null;
}

export interface ForecastPoint {
  time: string;
  temperature: number;
}

export interface ForecastEntry {
  dt: number;
  main: {
    temp: number;
  };
}

export interface ForecastState {
  hourly: ForecastPoint[];
  loading: boolean;
  error: string | null;
}

export interface CityCardProps {
  city: string;
  temperature: number;
  description: string;
  icon: string;
}
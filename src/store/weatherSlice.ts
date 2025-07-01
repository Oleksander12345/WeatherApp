import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { saveCitiesToStorage } from '../utils/localStorage';
import { WeatherData } from '../types';
import { WeatherState } from '../types';
import { API_KEY } from '../config';

const initialState: WeatherState = {
  cities: [],
  weatherByCity: {},
  error: null,
};

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${API_KEY}`
      );
      const data = res.data;
      return {
        name: data.name,
        temperature: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        lat: data.coord.lat,
        lon: data.coord.lon
      } as WeatherData;
    } catch {
      return rejectWithValue('City not found');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    removeCity(state, action: PayloadAction<string>) {
      state.cities = state.cities.filter(c => c !== action.payload);
      delete state.weatherByCity[action.payload];
      saveCitiesToStorage(state.cities);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
      const cityName = action.payload.name;

      if (!state.cities.includes(cityName)) {
        state.cities.push(cityName);
        saveCitiesToStorage(state.cities);
      }

      state.weatherByCity[cityName] = action.payload;
      state.error = null;
    })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
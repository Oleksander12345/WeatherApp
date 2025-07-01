// src/store/forecastSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ForecastEntry } from '../types';
import { ForecastState } from '../types';
import { API_KEY } from '../config';


const initialState: ForecastState = {
  hourly: [],
  loading: false,
  error: null,
};

export const fetchForecastByCity = createAsyncThunk(
  'forecast/fetchByCity',
  async (city: string, { rejectWithValue }) => {
    try {
        const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=en&appid=${API_KEY}`
        );

        const forecast = (res.data.list as ForecastEntry[]).slice(0, 8).map((entry) => ({
            time: new Date(entry.dt * 1000).toLocaleTimeString('uk-UA', {
                hour: '2-digit',
                minute: '2-digit',
            }),
            temperature: entry.main.temp,
        }));

        return forecast;
    } catch {
      return rejectWithValue('Could not make the weather forecast');
    }
  }
);

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchForecastByCity.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecastByCity.fulfilled, (state, action) => {
        state.hourly = action.payload;
        state.loading = false;
      })
      .addCase(fetchForecastByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default forecastSlice.reducer;

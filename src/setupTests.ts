import 'dotenv/config';

import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// 4. Мокаємо axios
import axios from 'axios';
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockedAxios.get.mockReset();
  mockedAxios.get.mockResolvedValue({
    data: {
      name: 'Kyiv',
      main: { temp: 10 },
      weather: [{ icon: '01d', description: 'clear sky' }],
      coord: { lat: 50.45, lon: 30.52 },
    }
  });
});

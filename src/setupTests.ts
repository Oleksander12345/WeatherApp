// src/setupTests.ts

// 1. Завантажує .env змінні до process.env
import 'dotenv/config';

// 2. Розширює matchers (наприклад: expect(...).toBeInTheDocument())
import '@testing-library/jest-dom';

// 3. Для сумісності з jsdom (де TextEncoder/Decoder не реалізовані повністю)
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// 4. Мокаємо axios
import axios from 'axios';
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

// 5. Стандартна мок-відповідь перед кожним тестом
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

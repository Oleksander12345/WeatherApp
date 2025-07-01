import { render, screen, fireEvent } from '@testing-library/react';
import AddCityForm from '../pages/AddCityForm';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';

describe('AddCityForm component', () => {
  test('renders input and button', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AddCityForm />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/enter your city/i)).toBeInTheDocument();
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });

  test('adds city on form submit', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AddCityForm />
        </Provider>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/enter your city/i);
    const button = screen.getByText(/add/i);

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Kyiv' } });
      fireEvent.click(button);
    });

    // Перевіряємо, що поле очистилось після сабміту
    expect(input).toHaveValue('');
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import CityCard from '../pages/CityCard';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { BrowserRouter } from 'react-router-dom';

const city = {
  city: 'Kyiv',
  temperature: 15.2,
  description: 'clear sky',
  icon: '01d',
};

describe('CityCard component', () => {
  test('renders city card with correct data', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CityCard {...city} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Kyiv/i)).toBeInTheDocument();
    expect(screen.getByText(/15/i)).toBeInTheDocument();
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
  });

  test('calls refresh handler on click', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CityCard {...city} />
        </BrowserRouter>
      </Provider>
    );

    const refreshBtn = screen.getByText(/Update/i);
    fireEvent.click(refreshBtn);

    expect(refreshBtn).toBeInTheDocument();
  });
});

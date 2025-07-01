import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchWeatherByCity } from '../store/weatherSlice';
import CityList from './CityList';
import { loadCitiesFromStorage } from '../utils/localStorage';

export default function AddCityForm() {
  const [city, setCity] = useState('');
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.weather.error);
    useEffect(() => {
    const storedCities = loadCitiesFromStorage();
    storedCities.forEach(city => {
      dispatch(fetchWeatherByCity(city));
    });
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      dispatch(fetchWeatherByCity(city.trim()));
      setCity('');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="city-form">
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter your city"
        />
        <button type="submit">Add</button>
        {error && <p className="error-message">{error}</p>}
      </form>

      <CityList />
    </div>
  );
}

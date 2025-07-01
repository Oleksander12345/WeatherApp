import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { fetchForecastByCity } from '../store/forecastSlice';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

export default function CityDetails() {
  const { name } = useParams<{ name: string }>();
  const dispatch = useAppDispatch();

  const weather = useAppSelector(state => state.weather.weatherByCity[name || '']);
  const { hourly, loading, error } = useAppSelector(state => state.forecast);

  useEffect(() => {
    if (name) {
      dispatch(fetchForecastByCity(name));
    }
  }, [dispatch, name]);

  if (!weather) return <p>City not found.</p>;

  return (
    <div className="city-details">
      <h1>{weather.name}</h1>
      <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="icon" />
      <p>🌡 Temperature: {Math.round(weather.temperature)}°C</p>
      <p>🌤 {weather.description}</p>
      <p>📊 Forecast for the next few hours</p>

      {loading && <p>Downloading the graph...</p>}
      {error && <p>{error}</p>}

      {hourly.length > 0 && (
        <div className="mt-6">
          <Line
            data={{
              labels: hourly.map(h => h.time),
              datasets: [
                {
                  label: 'Temperature (°C)',
                  data: hourly.map(h => h.temperature),
                  borderColor: 'rgb(59,130,246)',
                  backgroundColor: 'rgba(59,130,246,0.3)',
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top' },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

import { useAppSelector } from '../store/hooks';
import CityCard from './CityCard';

export default function CityList() {
  const { cities, weatherByCity } = useAppSelector(state => state.weather);

  return (
    <div className="city-list">
      {cities.map(city => {
        const data = weatherByCity[city];
        if (!data) return null;

        return (
          <CityCard
            key={city}
            city={data.name}
            temperature={data.temperature}
            description={data.description}
            icon={data.icon}
          />
        );
      })}
    </div>
  );
}

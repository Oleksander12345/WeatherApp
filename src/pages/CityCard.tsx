import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { fetchWeatherByCity, removeCity } from '../store/weatherSlice';
import { useNavigate } from 'react-router-dom';
import { CityCardProps } from '../types';

const CityCard: React.FC<CityCardProps> = ({ city, temperature, description, icon }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(fetchWeatherByCity(city));
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeCity(city));
  };

  const handleClick = () => {
    navigate(`/city/${city}`);
  };

  return (
    <div className="city-card" onClick={handleClick}>
        <div className="card-header">
            <h2>{city}</h2>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" />
        </div>
        <div className="card-body">
            <p>{Math.round(temperature)}°C</p>
            <p>{description}</p>
        </div>
        <div className="card-actions">
            <button onClick={handleRefresh}>🔄 Update</button>
            <button onClick={handleRemove}>🗑️ Delete</button>
            <button onClick={(e) => { e.stopPropagation(); navigate(`/city/${city}`); }}>
            📄 Details
            </button>
        </div>
    </div>
  );
};

export default CityCard;

export const saveCitiesToStorage = (cities: string[]) => {
  localStorage.setItem('weather_cities', JSON.stringify(cities));
};

export const loadCitiesFromStorage = (): string[] => {
  const stored = localStorage.getItem('weather_cities');
  return stored ? JSON.parse(stored) : [];
};
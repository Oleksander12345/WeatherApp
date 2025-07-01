import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCityForm from './pages/AddCityForm';
import CityDetails from './pages/CityDetails';
import './styles/App.scss';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<AddCityForm />} />
        <Route path="/city/:name" element={<CityDetails />} />
      </Routes>
    </Router>

    </>
  )
}

export default App

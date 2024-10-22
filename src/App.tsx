import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PokemonPage from './pages/PokemonPage/PokemonPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:pokemonNameOrId" element={<PokemonPage />} />
      </Routes>
    </Router>
  );
};

export default App;

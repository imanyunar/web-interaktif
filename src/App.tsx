import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GameProvider } from './contexts/GameContext';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import PetunjukPage from './pages/PetunjukPage';
import MenuPage from './pages/MenuPage';
import Pertemuan1Page from './pages/Pertemuan1Page';
import Pertemuan2Page from './pages/Pertemuan2Page';
import ExplorePage from './pages/ExplorePage';
import CompositionPage from './pages/CompositionPage';
import PracticePage from './pages/PracticePage';
import PenutupPage from './pages/PenutupPage';

function AppContent() {
  const location = useLocation();
  const isMainFlow = ['/', '/petunjuk', '/menu', '/pertemuan-1', '/pertemuan-2', '/penutup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-pastel-teal">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/petunjuk" element={<PetunjukPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/pertemuan-1" element={<Pertemuan1Page />} />
          <Route path="/pertemuan-2" element={<Pertemuan2Page />} />
          <Route path="/penutup" element={<PenutupPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/composition" element={<CompositionPage />} />
          <Route path="/practice" element={<PracticePage />} />
        </Routes>
      </AnimatePresence>
      {!isMainFlow && <NavigationBar />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </BrowserRouter>
  );
}

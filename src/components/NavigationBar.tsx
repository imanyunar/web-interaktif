import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

const items = [
  { path: '/explore', label: 'Eksplorasi', icon: '🔷' },
  { path: '/composition', label: 'Komposisi', icon: '🏗️' },
  { path: '/practice', label: 'Latihan', icon: '✏️' },
];

export default function NavigationBar() {
  const nav = useNavigate();
  const loc = useLocation();
  const { playClick } = useAudio();

  if (['/', '/petunjuk', '/menu', '/pertemuan-1', '/pertemuan-2', '/penutup'].includes(loc.pathname)) return null;

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-overlay"
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="flex justify-around items-center py-2 px-2"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
          borderTop: '2px solid rgba(255,255,255,0.25)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
        }}
      >
        {items.map((item) => {
          const active = loc.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              onClick={() => { playClick(); nav(item.path); }}
              className="flex flex-col items-center px-4 py-1.5 rounded-xl transition-all cursor-pointer border-none"
              style={{
                background: active ? 'rgba(255,255,255,0.20)' : 'transparent',
              }}
              whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg md:text-xl">{item.icon}</span>
              <span className="text-[10px] md:text-xs font-bold" style={{ color: active ? 'white' : 'rgba(255,255,255,0.75)' }}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}

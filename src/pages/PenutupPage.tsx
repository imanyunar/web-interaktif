import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';
import { useGame } from '../contexts/GameContext';
import Button from '../components/Button';

export default function PenutupPage() {
  const nav = useNavigate();
  const { playClick, playSuccess } = useAudio();
  const { score } = useGame();

  const stars = score >= 4 ? 3 : score >= 2 ? 2 : 1;

  return (
    <div className="page-container active">
      <img src="/assets/bg/bg_penutup.png" className="absolute inset-0 w-full h-full object-cover" alt="" draggable={false} />
      <div className="bg-overlay" />

      <div className="page-content">
        <div className="card-glass text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.15 }}
          >
            <span className="text-7xl md:text-8xl">🎓</span>
          </motion.div>

          <motion.h1
            className="mt-4" style={{ color: 'var(--color-primary)' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Selamat!
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-semibold mt-1"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Kamu sudah menyelesaikan pembelajaran!
          </motion.p>

          <motion.div
            className="flex justify-center gap-2 my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-5xl"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: i < stars ? 1 : 0.35, rotate: 0 }}
                transition={{ delay: 0.55 + i * 0.15, type: 'spring' }}
              >
                ⭐
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="rounded-2xl p-5 mb-6"
            style={{ background: '#FFF0E0', border: '2px solid var(--color-border)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm font-bold" style={{ color: 'var(--color-text-muted)' }}>Skor Akhir</p>
            <p className="text-5xl md:text-6xl font-black" style={{ color: 'var(--color-primary)' }}>{score}</p>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <img src="/assets/char/char_guru_berdiri.png" className="w-16 md:w-20 drop-shadow-xl" alt="" />
            <div className="rounded-2xl p-4 text-left" style={{ background: '#FFF0E0', border: '2px solid var(--color-border)' }}>
              <p className="font-bold text-sm">
                {score >= 4
                  ? 'Luar biasa! Kamu sudah menguasai bangun datar! 🎉'
                  : score >= 2
                    ? 'Bagus! Ayo belajar lagi biar makin pintar! 💪'
                    : 'Terus belajar ya! Kamu pasti bisa! 😊'}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-3 justify-center flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button onClick={() => { playClick(); nav('/menu'); }}>
              📚 Belajar Lagi
            </Button>
            <Button variant="secondary" onClick={() => { playSuccess(); nav('/'); }}>
              🏠 Beranda
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

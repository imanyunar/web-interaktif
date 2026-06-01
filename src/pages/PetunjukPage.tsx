import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';
import Button from '../components/Button';

const steps = [
  { icon: '👀', title: 'Amati', desc: 'Amati gambar benda nyata di sekitarmu' },
  { icon: '👆', title: 'Klik', desc: 'Klik titik sudut & sisi untuk melihat data' },
  { icon: '📝', title: 'Catat', desc: 'Catat hasil pengamatan di tabel' },
];

export default function PetunjukPage() {
  const nav = useNavigate();
  const { playClick, playSuccess } = useAudio();

  return (
    <div className="page-container active">
      <img src="/assets/bg/bg_petunjuk_langit.png" className="absolute inset-0 w-full h-full object-cover" alt="" draggable={false} />
      <div className="bg-overlay" />

      <div className="page-content">
        <div className="card-glass">
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <img src="/assets/char/char_guru_berbicara.png" className="w-20 md:w-28 drop-shadow-xl" alt="" />
            <div>
              <h1 className="text-3xl md:text-5xl font-black" style={{ color: 'var(--color-primary)' }}>Petunjuk</h1>
              <p className="text-sm font-bold" style={{ color: 'var(--color-text-muted)' }}>Belajar Bangun Datar</p>
            </div>
          </motion.div>

          <div className="space-y-4 mb-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex items-center gap-4 bg-white rounded-2xl p-4 md:p-5 shadow-md"
                style={{ border: '2px solid var(--color-border)' }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-lg shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
                  {step.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-black text-lg md:text-xl" style={{ color: 'var(--color-text)' }}>
                    <span style={{ color: 'var(--color-primary)' }}>{i + 1}.</span> {step.title}
                  </p>
                  <p className="text-sm md:text-base font-semibold" style={{ color: 'var(--color-text-muted)' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button size="lg" onClick={() => { playSuccess(); nav('/menu'); }}>
              🚀 Lanjut ke Menu
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <button className="btn btn-ghost" onClick={() => { playClick(); nav('/'); }}>
            ← Kembali ke Beranda
          </button>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';

const cards = [
  {
    title: 'Pertemuan 1',
    subtitle: 'Mengenal Bangun Datar',
    desc: 'Pelajari segitiga & segi empat lewat benda di sekitarmu!',
    route: '/pertemuan-1',
    from: '#FF8C00',
    to: '#E65C00',
    icon: '🔺',
    objects: ['Sandwich', 'Rambu', 'Gantungan', 'Papan Tulis'],
  },
  {
    title: 'Pertemuan 2',
    subtitle: 'Komposisi & Dekomposisi',
    desc: 'Bongkar dan susun bentuk kompleks jadi bangun datar!',
    route: '/pertemuan-2',
    from: '#2196F3',
    to: '#1565C0',
    icon: '🧩',
    objects: ['Rumah', 'Perahu', 'Robot', 'Kucing'],
  },
];

export default function MenuPage() {
  const nav = useNavigate();
  const { playClick, playSuccess } = useAudio();

  return (
    <div className="page-container active">
      <img src="/assets/bg/bg_menu_taman.png" className="absolute inset-0 w-full h-full object-cover" alt="" draggable={false} />
      <div className="bg-overlay" />

      <div className="page-content">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-white drop-shadow-lg" style={{ textShadow: '0 3px 6px rgba(0,0,0,0.3)' }}>
            Pilih Pertemuan
          </h1>
          <p className="text-white/80 font-bold text-lg mt-1">
            Petualangan belajar bangun datar!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 w-full" style={{ maxWidth: '640px' }}>
          {cards.map((card, i) => (
            <motion.button
              key={card.route}
              onClick={() => { playSuccess(); nav(card.route); }}
              className="relative overflow-hidden rounded-[24px] shadow-2xl cursor-pointer text-left border-none w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.2, type: 'spring' }}
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.97 }}
              style={{ background: `linear-gradient(135deg, ${card.from}, ${card.to})` }}
            >
              <div className="p-6 md:p-7">
                <div className="text-5xl md:text-6xl mb-3">{card.icon}</div>
                <h2 className="text-2xl md:text-3xl font-black text-white">{card.title}</h2>
                <p className="text-white/90 font-bold text-base md:text-lg mt-1">{card.subtitle}</p>
                <p className="text-white/70 text-sm md:text-base mt-2 leading-relaxed">{card.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {card.objects.map((obj) => (
                    <span key={obj} className="px-3 py-1 rounded-full text-white text-xs font-bold" style={{ background: 'rgba(255,255,255,0.20)' }}>
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }} />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }} />
            </motion.button>
          ))}
        </div>

        <motion.div
          className="flex gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button className="btn btn-ghost" style={{ color: 'white' }} onClick={() => { playClick(); nav('/petunjuk'); }}>
            ← Petunjuk
          </button>
          <button className="btn btn-ghost" style={{ color: 'white' }} onClick={() => { playClick(); nav('/explore'); }}>
            🔷 Semua Bangun Datar
          </button>
        </motion.div>
      </div>
    </div>
  );
}

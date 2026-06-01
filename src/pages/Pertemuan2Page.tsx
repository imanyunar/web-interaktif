import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';
import { useGame } from '../contexts/GameContext';

interface Slide { id: string; content: React.ReactNode; }

const quizQuestions = [
  { q: 'Bangun datar apa yang memiliki 3 sisi?', options: ['Persegi', 'Segitiga', 'Lingkaran', 'Trapesium'], correct: 1 },
  { q: 'Berapa jumlah sudut pada persegi panjang?', options: ['3', '4', '5', '6'], correct: 1 },
  { q: 'Apa bentuk atap rumah pada gambar?', options: ['Persegi', 'Lingkaran', 'Segitiga', 'Jajar Genjang'], correct: 2 },
  { q: 'Bangun datar apa yang tidak memiliki sisi lurus?', options: ['Persegi', 'Segitiga', 'Trapesium', 'Lingkaran'], correct: 3 },
  { q: 'Berapa sisi yang dimiliki persegi?', options: ['3', '4', '5', '6'], correct: 1 },
];

const objects = [
  { name: 'Rumah', img: '/assets/obj/obj_rumah_geometri.png', parts: 'Segitiga + Persegi + Persegi Panjang' },
  { name: 'Perahu', img: '/assets/obj/obj_perahu_geometri.png', parts: 'Trapesium + Persegi Panjang + Segitiga' },
  { name: 'Robot', img: '/assets/obj/obj_robot_geometri.png', parts: 'Persegi + Persegi Panjang' },
  { name: 'Kucing', img: '/assets/obj/obj_kucing_geometri.png', parts: 'Lingkaran + Segitiga' },
];

const slidesData: Slide[] = [
  {
    id: 'intro',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150 }}>
          <span className="text-7xl md:text-8xl">🧩</span>
        </motion.div>
        <motion.h2 className="mt-5" style={{ color: '#2196F3' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Pertemuan 2
        </motion.h2>
        <motion.p className="text-lg md:text-xl font-bold mt-1" style={{ color: '#1565C0' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Komposisi & Dekomposisi Bangun Datar
        </motion.p>
        <motion.p className="font-semibold mt-4 max-w-sm" style={{ color: 'var(--color-text-muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          Bangun datar bisa digabung membentuk benda keren! Yuk kita bongkar dan susun!
        </motion.p>
        <motion.div className="flex gap-4 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {['🏠', '⛵', '🤖', '🐱'].map((e, i) => (
            <motion.span key={i} className="text-4xl" animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>{e}</motion.span>
          ))}
        </motion.div>
      </div>
    ),
  },
  {
    id: 'objects',
    content: (
      <div className="flex flex-col h-full">
        <motion.h2 className="text-center mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>🎨 Benda dari Bangun Datar</motion.h2>
        <motion.p className="text-center font-semibold mb-5" style={{ color: 'var(--color-text-muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          Lihat! Benda-benda ini tersusun dari beberapa bangun datar!
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">
          {objects.map((obj, i) => (
            <motion.div
              key={obj.name}
              className="card !p-3 md:!p-4 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, type: 'spring' }}
              whileHover={{ scale: 1.04, y: -3 }}
            >
              <img src={obj.img} className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-md" alt={obj.name} draggable={false} />
              <p className="font-bold text-sm mt-2">{obj.name}</p>
              <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{obj.parts}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'komposisi-demo',
    content: (
      <div className="flex flex-col items-center h-full text-center">
        <motion.h2 className="mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>🔨 Bongkar & Susun</motion.h2>
        <motion.p className="font-semibold mb-5 max-w-sm" style={{ color: 'var(--color-text-muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          Klik "Komposisi" di menu bawah untuk mencoba membongkar dan menyusun sendiri!
        </motion.p>
        <div className="flex-1 flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <motion.div className="flex flex-col items-center" animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <img src="/assets/obj/obj_rumah_geometri.png" className="w-24 md:w-32 object-contain drop-shadow-lg" alt="" draggable={false} />
            <p className="font-bold text-sm mt-1" style={{ color: 'var(--color-primary)' }}>🔧 Susun</p>
          </motion.div>
          <motion.span className="text-2xl font-black" style={{ color: 'var(--color-text-muted)' }}>→</motion.span>
          <div className="flex gap-2 items-center">
            <motion.img src="/assets/part/part_rumah_atap_segitiga.png" className="w-12 h-12 md:w-16 md:h-16 object-contain" alt="" draggable={false} animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
            <motion.img src="/assets/part/part_rumah_dinding_persegi.png" className="w-12 h-12 md:w-16 md:h-16 object-contain" alt="" draggable={false} animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.15 }} />
            <motion.img src="/assets/part/part_rumah_pintu_persegi_panjang.png" className="w-10 h-12 md:w-14 md:h-16 object-contain" alt="" draggable={false} animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
          </div>
          <motion.span className="text-2xl font-black" style={{ color: 'var(--color-text-muted)' }}>=</motion.span>
          <motion.div className="flex flex-col items-center" animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}>
            <img src="/assets/obj/obj_rumah_geometri.png" className="w-24 md:w-32 object-contain drop-shadow-lg" alt="" draggable={false} />
            <p className="font-bold text-sm mt-1" style={{ color: '#2196F3' }}>🔨 Bongkar</p>
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    id: 'quiz',
    content: <QuizSection />,
  },
];

function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const { playClick, playSuccess, playError } = useAudio();
  const { incrementScore } = useGame();
  const nav = useNavigate();

  const q = quizQuestions[currentQ];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) { playSuccess(); setCorrectCount((c) => c + 1); incrementScore(); }
    else { playError(); }
    setTimeout(() => {
      if (currentQ < quizQuestions.length - 1) { setCurrentQ((c) => c + 1); setSelected(null); }
      else { setFinished(true); }
    }, 900);
  };

  const restart = () => { setCurrentQ(0); setSelected(null); setCorrectCount(0); setFinished(false); };

  if (finished) {
    const stars = correctCount >= 4 ? 3 : correctCount >= 3 ? 2 : 1;
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <span className="text-6xl">🎉</span>
        </motion.div>
        <motion.h2 className="mt-4" style={{ color: 'var(--color-primary)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          Kuis Selesai!
        </motion.h2>
        <motion.div className="flex gap-1 text-4xl my-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: i < stars ? 1 : 0.3 }} transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}>⭐</motion.span>
          ))}
        </motion.div>
        <motion.p className="text-xl font-bold mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Nilai: {correctCount} / {quizQuestions.length}
        </motion.p>
        <motion.div className="flex gap-3 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => { playClick(); restart(); }}>
            🔄 Ulang Kuis
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => { playSuccess(); nav('/menu'); }}>
            🏠 Ke Menu
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => { playSuccess(); nav('/penutup'); }}>
            📜 Lihat Skor
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-black" style={{ color: 'var(--color-text)' }}>📝 Kuis Evaluasi</h2>
        <p className="text-sm font-bold mt-1" style={{ color: 'var(--color-text-muted)' }}>Soal {currentQ + 1} dari {quizQuestions.length}</p>
        <div className="w-full h-2 rounded-full mt-2 max-w-xs mx-auto" style={{ background: '#e0e0e0' }}>
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}
            initial={{ width: 0 }} animate={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }} />
        </div>
      </div>

      <motion.div className="flex-1 flex flex-col items-center justify-center" key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <motion.p className="text-lg md:text-xl font-bold text-center mb-5 max-w-sm" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
          {q.q}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-sm">
          {q.options.map((opt, idx) => {
            const isCorrect = selected !== null && idx === q.correct;
            const isWrong = selected === idx && idx !== q.correct;
            return (
              <motion.button
                key={opt}
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
                className="btn !rounded-[14px] w-full"
                style={{
                  background: isCorrect ? '#E8F5E9' : isWrong ? '#FFEBEE' : selected !== null ? '#f5f5f5' : 'white',
                  border: `2px solid ${isCorrect ? '#4CAF50' : isWrong ? '#EF5350' : selected !== null ? '#e0e0e0' : 'var(--color-border)'}`,
                  color: isCorrect ? '#2E7D32' : isWrong ? '#C62828' : selected !== null ? '#bbb' : 'var(--color-text)',
                  cursor: selected !== null ? 'not-allowed' : 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                }}
                whileHover={selected === null ? { scale: 1.04 } : {}}
                whileTap={selected === null ? { scale: 0.97 } : {}}
              >
                {opt} {isCorrect ? '✅' : isWrong ? '❌' : ''}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default function Pertemuan2Page() {
  const [slide, setSlide] = useState(0);
  const nav = useNavigate();
  const { playClick } = useAudio();
  const total = slidesData.length;

  const next = () => { playClick(); if (slide < total - 1) setSlide((s) => s + 1); };
  const prev = () => { playClick(); if (slide > 0) setSlide((s) => s - 1); else nav('/menu'); };

  return (
    <div className="page-container active">
      <img src="/assets/bg/bg_pertemuan2_luar_ruang.png" className="absolute inset-0 w-full h-full object-cover" alt="" draggable={false} />
      <div className="bg-overlay" />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 md:px-6 py-2" style={{ background: 'rgba(255,255,255,0.50)', backdropFilter: 'blur(8px)', borderBottom: '1.5px solid rgba(255,255,255,0.45)' }}>
          <div className="flex items-center gap-2">
            <img src="/assets/char/char_guru_menunjuk.png" className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-md" alt="" />
            <div>
              <p className="font-bold text-sm">Pertemuan 2</p>
              <div className="slide-dots">
                {slidesData.map((_, i) => (
                  <div key={i} className={`slide-dot ${i === slide ? 'active' : ''}`} />
                ))}
              </div>
            </div>
          </div>
          <span className="text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>{slide + 1} / {total}</span>
        </div>

        <div className="flex-1 flex items-center justify-center p-3 md:p-6">
          <div className="card-glass flex flex-col" style={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                className="flex-1 flex flex-col"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              >
                {slidesData[slide].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="slide-nav">
          <button className="btn btn-secondary btn-sm" onClick={prev}>
            ← {slide === 0 ? 'Menu' : 'Kembali'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => { playClick(); nav('/menu'); }}>🏠</button>
          <button className="btn btn-primary btn-sm" onClick={next}>
            {slide === total - 1 ? 'Selesai 🎉' : 'Lanjut →'}
          </button>
        </div>
      </div>
    </div>
  );
}

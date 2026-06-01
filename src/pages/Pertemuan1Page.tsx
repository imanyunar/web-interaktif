import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';

interface Slide { id: string; content: React.ReactNode; }

const realObjects = [
  { name: 'Sandwich', img: '/assets/obj/obj_sandwich_segitiga.png', shape: 'Segitiga', shapeImg: '/assets/shape/shape_segitiga.png' },
  { name: 'Rambu Lalu Lintas', img: '/assets/obj/obj_rambu_lalu_lintas.png', shape: 'Segitiga', shapeImg: '/assets/shape/shape_segitiga.png' },
  { name: 'Gantungan Baju', img: '/assets/obj/obj_gantungan_baju.png', shape: 'Segitiga', shapeImg: '/assets/shape/shape_segitiga.png' },
  { name: 'Papan Tulis', img: '/assets/obj/obj_papan_tulis.png', shape: 'Persegi Panjang', shapeImg: '/assets/shape/shape_persegi_panjang.png' },
  { name: 'Tas Belanja', img: '/assets/obj/obj_tas_belanja.png', shape: 'Persegi Panjang', shapeImg: '/assets/shape/shape_persegi_panjang.png' },
  { name: 'Jam Dinding', img: '/assets/obj/obj_jam_dinding.png', shape: 'Lingkaran', shapeImg: '/assets/shape/shape_lingkaran.png' },
];

const slidesData: Slide[] = [
  {
    id: 'intro',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150 }}>
          <span className="text-7xl md:text-8xl">🔺</span>
        </motion.div>
        <motion.h2 className="mt-5" style={{ color: 'var(--color-primary)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Pertemuan 1
        </motion.h2>
        <motion.p className="text-lg md:text-xl font-bold mt-1" style={{ color: 'var(--color-primary-dark)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Mengenal Bangun Datar
        </motion.p>
        <motion.p className="font-semibold mt-4 max-w-md" style={{ color: 'var(--color-text-muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          Hari ini kita akan belajar tentang segitiga, segi empat, dan lingkaran melalui benda-benda di sekitar kita!
        </motion.p>
        <motion.div className="flex gap-4 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {['🔺', '⬛', '⭕'].map((e, i) => (
            <motion.span key={i} className="text-4xl" animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>{e}</motion.span>
          ))}
        </motion.div>
      </div>
    ),
  },
  {
    id: 'real-objects',
    content: (
      <div className="flex flex-col h-full">
        <motion.h2 className="text-center mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          🏠 Benda di Sekitar Kita
        </motion.h2>
        <motion.p className="text-center font-semibold mb-5" style={{ color: 'var(--color-text-muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          Banyak benda di sekitar kita yang berbentuk bangun datar!
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1">
          {realObjects.map((obj, i) => (
            <motion.div
              key={obj.name}
              className="card !p-4 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, type: 'spring' }}
              whileHover={{ scale: 1.04, y: -3 }}
            >
              <img src={obj.img} className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-md" alt={obj.name} draggable={false} />
              <p className="font-bold text-sm mt-2">{obj.name}</p>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full mt-1" style={{ color: 'var(--color-primary)', background: '#FFF0E0' }}>
                {obj.shape}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'segitiga-intro',
    content: (
      <div className="flex flex-col items-center h-full text-center">
        <motion.h2 className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>🔺 Mengenal Segitiga</motion.h2>
        <div className="flex-1 flex flex-col items-center justify-center">
          <img src="/assets/shape/shape_segitiga.png" className="w-32 md:w-44 object-contain drop-shadow-xl" alt="" draggable={false} />
          <div className="card !p-5 mt-4 max-w-sm">
            <p className="font-semibold leading-relaxed">
              Segitiga adalah bangun datar yang memiliki <strong style={{ color: 'var(--color-primary)' }}>3 sisi</strong> dan <strong style={{ color: 'var(--color-primary)' }}>3 sudut</strong>.
              Jumlah ketiga sudutnya selalu <strong style={{ color: 'var(--color-primary)' }}>180°</strong>.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tabel-segitiga',
    content: (
      <div className="flex flex-col h-full">
        <motion.h2 className="text-center mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>📊 Ciri-Ciri Segitiga</motion.h2>
        <motion.div
          className="card !p-0 overflow-hidden max-w-sm mx-auto w-full"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="px-5 py-3 text-white font-black text-lg" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
            Tabel Pengamatan Segitiga
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: 'Jumlah Sisi', value: '3 sisi' },
              { label: 'Jumlah Sudut', value: '3 sudut' },
              { label: 'Total Sudut', value: '180°' },
              { label: 'Jenis', value: 'Siku-siku, sama kaki, sembarang' },
            ].map((row, i) => (
              <motion.div key={row.label} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.08 }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--color-primary)' }} />
                <span className="font-bold min-w-[110px] text-sm">{row.label}</span>
                <span className="font-semibold text-sm" style={{ color: 'var(--color-text-muted)' }}>{row.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div className="flex gap-3 mt-4 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          {['/assets/obj/obj_sandwich_segitiga.png', '/assets/obj/obj_rambu_lalu_lintas.png', '/assets/obj/obj_gantungan_baju.png'].map((src) => (
            <motion.img key={src} src={src} className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-md" alt="" draggable={false} whileHover={{ scale: 1.15 }} />
          ))}
        </motion.div>
      </div>
    ),
  },
  {
    id: 'segiempat-intro',
    content: (
      <div className="flex flex-col items-center h-full text-center">
        <motion.h2 className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>⬛ Segi Empat</motion.h2>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex gap-3 md:gap-4 items-center">
            <img src="/assets/shape/shape_persegi.png" className="w-20 md:w-28 object-contain drop-shadow-lg" alt="" draggable={false} />
            <img src="/assets/shape/shape_persegi_panjang.png" className="w-20 md:w-28 object-contain drop-shadow-lg" alt="" draggable={false} />
            <img src="/assets/shape/shape_jajar_genjang.png" className="w-20 md:w-28 object-contain drop-shadow-lg" alt="" draggable={false} />
          </div>
          <div className="card !p-5 mt-4 max-w-sm">
            <p className="font-semibold leading-relaxed">
              Segi empat adalah bangun datar yang memiliki <strong style={{ color: '#4CAF50' }}>4 sisi</strong> dan <strong style={{ color: '#4CAF50' }}>4 sudut</strong>.
              Ada banyak jenis segi empat!
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'jenis-segiempat',
    content: (
      <div className="flex flex-col h-full">
        <motion.h2 className="text-center mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>📐 Jenis-Jenis Segi Empat</motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1">
          {[
            { name: 'Persegi', img: '/assets/shape/shape_persegi.png', desc: '4 sisi sama' },
            { name: 'Persegi Panjang', img: '/assets/shape/shape_persegi_panjang.png', desc: '2 pasang sisi' },
            { name: 'Jajar Genjang', img: '/assets/shape/shape_jajar_genjang.png', desc: 'Sisi miring' },
            { name: 'Belah Ketupat', img: '/assets/shape/shape_belah_ketupat.png', desc: '4 sisi miring' },
            { name: 'Layang-layang', img: '/assets/shape/shape_layang_layang.png', desc: '2 pasang sama' },
            { name: 'Trapesium', img: '/assets/shape/shape_trapesium.png', desc: '1 pasang sejajar' },
          ].map((s, i) => (
            <motion.div key={s.name} className="card !p-3 flex flex-col items-center text-center" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08 * i }}>
              <img src={s.img} className="w-10 h-10 md:w-14 md:h-14 object-contain" alt={s.name} draggable={false} />
              <p className="font-bold text-xs mt-1">{s.name}</p>
              <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lingkaran',
    content: (
      <div className="flex flex-col items-center h-full text-center">
        <motion.h2 className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>⭕ Lingkaran</motion.h2>
        <div className="flex-1 flex flex-col items-center justify-center">
          <img src="/assets/shape/shape_lingkaran.png" className="w-32 md:w-44 object-contain drop-shadow-xl" alt="" draggable={false} />
          <div className="card !p-5 mt-4 max-w-sm">
            <p className="font-semibold leading-relaxed">
              Lingkaran adalah bangun datar yang dibatasi oleh <strong style={{ color: '#E8A020' }}>garis lengkung</strong>.
              Tidak memiliki sisi lurus, tapi memiliki <strong style={{ color: '#E8A020' }}>jari-jari (r)</strong> dan <strong style={{ color: '#E8A020' }}>diameter (d)</strong>.
            </p>
          </div>
          <img src="/assets/obj/obj_jam_dinding.png" className="w-14 h-14 md:w-20 md:h-20 object-contain mt-4" alt="" draggable={false} />
        </div>
      </div>
    ),
  },
  {
    id: 'kesimpulan',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150 }}>
          <span className="text-6xl md:text-7xl">🎉</span>
        </motion.div>
        <motion.h2 className="mt-5" style={{ color: 'var(--color-primary)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Selamat!
        </motion.h2>
        <motion.p className="font-semibold text-lg mt-2 max-w-sm" style={{ color: 'var(--color-text-muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Kamu sudah belajar tentang bangun datar. Saatnya lanjut ke Pertemuan 2!
        </motion.p>
        <motion.div className="flex gap-3 mt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <img src="/assets/shape/shape_segitiga.png" className="w-12 h-12 md:w-16 md:h-16 object-contain" alt="" draggable={false} />
          <img src="/assets/shape/shape_persegi.png" className="w-12 h-12 md:w-16 md:h-16 object-contain" alt="" draggable={false} />
          <img src="/assets/shape/shape_lingkaran.png" className="w-12 h-12 md:w-16 md:h-16 object-contain" alt="" draggable={false} />
        </motion.div>
      </div>
    ),
  },
];

export default function Pertemuan1Page() {
  const [slide, setSlide] = useState(0);
  const nav = useNavigate();
  const { playClick, playSuccess } = useAudio();
  const total = slidesData.length;

  const next = () => {
    playClick();
    if (slide < total - 1) setSlide((s) => s + 1);
    else { playSuccess(); nav('/menu'); }
  };

  const prev = () => {
    playClick();
    if (slide > 0) setSlide((s) => s - 1);
    else nav('/menu');
  };

  return (
    <div className="page-container active">
      <img src="/assets/bg/bg_kelas.png" className="absolute inset-0 w-full h-full object-cover" alt="" draggable={false} />
      <div className="bg-overlay" />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 md:px-6 py-2" style={{ background: 'rgba(255,255,255,0.50)', backdropFilter: 'blur(8px)', borderBottom: '1.5px solid rgba(255,255,255,0.45)' }}>
          <div className="flex items-center gap-2">
            <img src="/assets/char/char_guru_berdiri.png" className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-md" alt="" />
            <div>
              <p className="font-bold text-sm">Pertemuan 1</p>
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

        <div className="slide-nav pb-4">
          <button className="btn btn-secondary btn-sm" onClick={prev}>
            ← {slide === 0 ? 'Menu' : 'Kembali'}
          </button>

          <button className="btn btn-ghost btn-sm" onClick={() => { playClick(); nav('/menu'); }}>
            🏠
          </button>

          <button className="btn btn-primary btn-sm" onClick={next}>
            {slide === total - 1 ? 'Selesai 🎉' : 'Lanjut →'}
          </button>
        </div>
      </div>
    </div>
  );
}

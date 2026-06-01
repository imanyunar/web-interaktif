import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';
import Button from '../components/Button';

function FloatingShape({ src, x, y, delay, size }: { src: string; x: number; y: number; delay: number; size: number }) {
  return (
    <motion.img
      src={src}
      className="absolute z-deco drop-shadow-lg deco-medium"
      style={{ left: `${x}%`, top: `${y}%`, width: size }}
      alt=""
      draggable={false}
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      animate={{
        opacity: 0.6,
        scale: 1,
        rotate: 0,
        y: [0, -14, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.8 },
        scale: { delay, type: 'spring' },
        rotate: { delay, duration: 0.8 },
        y: { delay: delay + 0.5, duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { playSuccess } = useAudio();

  return (
    <div className="page-container active">
      <img
        src="/assets/bg/bg_beranda_taman.png"
        className="absolute inset-0 w-full h-full object-cover"
        alt=""
        draggable={false}
      />
      <div className="bg-overlay" />

      <motion.img
        src="/assets/char/char_anak_laki_laki.png"
        className="absolute bottom-16 left-[12%] w-36 md:w-52 drop-shadow-2xl anim-float"
        style={{ zIndex: 3 }}
        alt=""
        draggable={false}
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ opacity: { delay: 0.8, duration: 0.6 }, x: { delay: 0.8, type: 'spring' } }}
      />

      <motion.img
        src="/assets/char/char_anak_perempuan.png"
        className="absolute bottom-16 right-[12%] w-36 md:w-52 drop-shadow-2xl anim-float"
        style={{ animationDelay: '0.5s', zIndex: 3 }}
        alt=""
        draggable={false}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, x: { delay: 1, type: 'spring' } }}
      />

      <div className="page-content">
        <motion.div
          className="card-glass text-center"
          initial={{ scale: 0.3, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
        >
          <motion.p
            className="text-base md:text-lg font-bold text-white/90 mt-2"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Virtual Manipulative Math Berbasis RME
          </motion.p>
          <motion.p
            className="text-sm font-bold text-yellow-200 mt-1"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Belajar Bangun Datar Jadi Lebih Menyenangkan! ✨
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Button size="lg" onClick={() => { playSuccess(); navigate('/petunjuk'); }}>
              <span>🚀</span> MULAI BELAJAR
            </Button>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-white/50 text-sm font-bold mt-6 anim-float-slow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          ▼ Klik tombol untuk memulai ▼
        </motion.p>
      </div>

      <FloatingShape src="/assets/shape/shape_segitiga.png" x={4} y={16} delay={1.6} size={50} />
      <FloatingShape src="/assets/shape/shape_lingkaran.png" x={92} y={10} delay={1.8} size={55} />
      <FloatingShape src="/assets/shape/shape_persegi.png" x={6} y={76} delay={2} size={45} />
      <FloatingShape src="/assets/shape/shape_persegi_panjang.png" x={86} y={72} delay={2.2} size={48} />
      <FloatingShape src="/assets/shape/shape_jajar_genjang.png" x={48} y={6} delay={2.4} size={42} />
      <FloatingShape src="/assets/shape/shape_lingkaran.png" x={5} y={48} delay={2.6} size={35} />

      <div className="absolute bottom-0 left-0 right-0 h-16 z-content" style={{ background: '#D2852E' }} />
    </div>
  );
}

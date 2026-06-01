import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

interface PartDef {
  src: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ObjDef {
  id: string;
  name: string;
  parts: PartDef[];
  objImg: string;
  color: string;
}

const objects: ObjDef[] = [
  {
    id: 'rumah',
    name: 'Rumah',
    color: '#E03030',
    objImg: '/new_assets/objects/pertemuan-2/obj_rumah_geometri.png',
    parts: [
      { src: '/new_assets/parts/part_rumah_atap_segitiga.png', label: 'Atap (Segitiga)', x: 25, y: 2, w: 50, h: 40 },
      { src: '/new_assets/parts/part_rumah_dinding_persegi.png', label: 'Dinding (Persegi)', x: 20, y: 38, w: 60, h: 55 },
      { src: '/new_assets/parts/part_rumah_pintu_persegi_panjang.png', label: 'Pintu (Persegi Panjang)', x: 40, y: 55, w: 20, h: 38 },
    ],
  },
  {
    id: 'perahu',
    name: 'Perahu',
    color: '#2196F3',
    objImg: '/new_assets/objects/pertemuan-2/obj_perahu_geometri.png',
    parts: [
      { src: '/new_assets/parts/part_perahu_badan_trapesium.png', label: 'Badan (Trapesium)', x: 10, y: 55, w: 80, h: 35 },
      { src: '/new_assets/shapes/shape_persegi_panjang.png', label: 'Tiang (Persegi Panjang)', x: 48, y: 10, w: 5, h: 50 },
      { src: '/new_assets/parts/part_perahu_layar_segitiga.png', label: 'Layar (Segitiga)', x: 50, y: 8, w: 35, h: 50 },
    ],
  },
  {
    id: 'robot',
    name: 'Robot',
    color: '#9C27B0',
    objImg: '/new_assets/objects/pertemuan-2/obj_robot_geometri.png',
    parts: [
      { src: '/new_assets/parts/part_robot_kepala_persegi.png', label: 'Kepala (Persegi)', x: 35, y: 2, w: 30, h: 28 },
      { src: '/new_assets/parts/part_robot_badan_persegi_panjang.png', label: 'Badan (Persegi Panjang)', x: 30, y: 30, w: 40, h: 35 },
      { src: '/new_assets/shapes/shape_persegi_panjang.png', label: 'Tangan Kiri', x: 5, y: 32, w: 22, h: 10 },
      { src: '/new_assets/shapes/shape_persegi_panjang.png', label: 'Tangan Kanan', x: 73, y: 32, w: 22, h: 10 },
    ],
  },
  {
    id: 'kucing',
    name: 'Kucing',
    color: '#FF9800',
    objImg: '/new_assets/objects/pertemuan-2/obj_kucing_geometri.png',
    parts: [
      { src: '/new_assets/parts/part_kucing_kepala_lingkaran.png', label: 'Kepala (Lingkaran)', x: 32, y: 2, w: 36, h: 36 },
      { src: '/new_assets/parts/part_kucing_telinga_segitiga.png', label: 'Telinga Kiri (Segitiga)', x: 22, y: 0, w: 22, h: 22 },
      { src: '/new_assets/parts/part_kucing_telinga_segitiga.png', label: 'Telinga Kanan (Segitiga)', x: 56, y: 0, w: 22, h: 22 },
      { src: '/new_assets/parts/part_kucing_badan_lingkaran.png', label: 'Badan (Lingkaran)', x: 30, y: 36, w: 40, h: 40 },
    ],
  },
];

const partColors = ['#E03030', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63', '#795548', '#E8A020'];

export default function CompositionPage() {
  const [activeObj, setActiveObj] = useState<ObjDef>(objects[0]);
  const [mode, setMode] = useState<'assemble' | 'disassemble'>('assemble');
  const [showParts, setShowParts] = useState(true);
  const [partPositions, setPartPositions] = useState<Record<string, { x: number; y: number }>>({});
  const { playClick, playSuccess } = useAudio();

  const switchObj = (obj: ObjDef) => {
    playClick();
    setActiveObj(obj);
    setShowParts(true);
    setPartPositions({});
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-light-cyan)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-white/10" />
      </div>

      <div className="relative z-10 pb-28">
        <div className="sticky top-0 z-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1.5px solid var(--color-border)' }}>
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
            <motion.img
              src="/assets/char/char_guru_menunjuk.png"
              className="w-14 md:w-20 drop-shadow-lg"
              alt=""
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            />
            <div>
              <p className="font-bold text-lg md:text-xl" style={{ color: 'var(--color-text)' }}>
                Bangun datar bisa membentuk benda! 🔨 Bongkar dan susun kembali.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 mt-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {objects.map((obj) => (
              <motion.button
                key={obj.id}
                onClick={() => switchObj(obj)}
                className={`btn !rounded-[14px] !py-2 !px-5 text-sm`}
                style={{
                  background: activeObj.id === obj.id ? 'var(--color-primary)' : 'white',
                  color: activeObj.id === obj.id ? 'white' : 'var(--color-text)',
                  border: `2px solid ${activeObj.id === obj.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {obj.name}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            {(['assemble', 'disassemble'] as const).map((m) => (
              <motion.button
                key={m}
                onClick={() => { playClick(); setMode(m); setShowParts(m === 'assemble'); }}
                className={`btn !rounded-[14px]`}
                style={{
                  background: mode === m ? 'var(--color-primary)' : 'white',
                  color: mode === m ? 'white' : 'var(--color-text)',
                  border: `2px solid ${mode === m ? 'var(--color-primary)' : 'var(--color-border)'}`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{m === 'assemble' ? '🧩' : '🔨'}</span>
                {m === 'assemble' ? 'Susun' : 'Bongkar'}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeObj.id + mode}
              className="card-glass !w-full !max-w-none overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <div className="md:flex">
                <div className="md:w-3/5 relative p-4 md:p-6 flex items-center justify-center min-h-[400px]" style={{ background: 'rgba(255,255,255,0.6)' }}>
                  <div className="relative w-full max-w-lg aspect-square">
                    <img
                      src="/assets/bg/bg_kelas.png"
                      className="absolute inset-0 w-full h-full object-contain rounded-2xl opacity-40"
                      alt=""
                      draggable={false}
                    />

                    {mode === 'assemble' && showParts && (
                      activeObj.parts.map((part, i) => (
                        <motion.img
                          key={part.label + i}
                          src={part.src}
                          className="absolute drop-shadow-lg cursor-grab"
                          style={{
                            left: `${partPositions[part.label + i]?.x ?? part.x}%`,
                            top: `${partPositions[part.label + i]?.y ?? part.y}%`,
                            width: `${part.w}%`,
                            height: `${part.h}%`,
                          }}
                          initial={{ scale: 0, rotate: -180, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          transition={{ delay: i * 0.15, type: 'spring', stiffness: 80 }}
                          whileHover={{ scale: 1.12, zIndex: 50 }}
                          drag
                          dragMomentum
                          onDragEnd={(_e, info) => {
                            playSuccess();
                            setPartPositions((prev) => ({
                              ...prev,
                              [part.label + i]: {
                      x: (partPositions[part.label + i]?.x ?? part.x) + (info.offset.x / 12),
                      y: (partPositions[part.label + i]?.y ?? part.y) + (info.offset.y / 12),
                              },
                            }));
                          }}
                          alt={part.label}
                          title={part.label}
                        />
                      ))
                    )}

                    {mode === 'disassemble' && (
                      <motion.img
                        src={activeObj.objImg}
                        className="absolute inset-0 w-full h-full object-contain drop-shadow-xl"
                        alt=""
                        draggable={false}
                        initial={{ scale: 1 }}
                        animate={{ scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}

                    {mode === 'disassemble' && activeObj.parts.map((part, i) => (
                      <motion.img
                        key={part.label + i}
                        src={part.src}
                        className="absolute drop-shadow-lg cursor-pointer"
                        style={{ left: `${part.x}%`, top: `${part.y}%`, width: `${part.w}%`, height: `${part.h}%` }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          x: [0, (i % 2 === 0 ? -80 : 80) + (i * 7) % 20],
                          y: [0, 60 + i * 30],
                          rotate: [0, (i % 2 === 0 ? -15 : 15)],
                        }}
                        transition={{
                          delay: i * 0.15 + 0.3,
                          type: 'spring',
                          stiffness: 40,
                          damping: 8,
                        }}
                        whileHover={{ scale: 1.15, zIndex: 50 }}
                        onClick={() => playClick()}
                        alt={part.label}
                        title={part.label}
                      />
                    ))}
                  </div>

                  {showParts && mode === 'assemble' && (
                    <motion.p
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-bold bg-white/80 px-4 py-2 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      🖱️ Seret bagian-bagian untuk menyusun {activeObj.name}
                    </motion.p>
                  )}

                  {mode === 'disassemble' && (
                    <motion.p
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-orange-nav font-bold bg-white/80 px-4 py-2 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      🔍 Lihat bagaimana {activeObj.name} terbuat dari bangun datar!
                    </motion.p>
                  )}
                </div>

                <div className="md:w-2/5 p-6 space-y-4 bg-white/50">
                  <motion.h2
                    className="text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <span className="text-3xl">
                      {activeObj.id === 'rumah' ? '🏠' : activeObj.id === 'perahu' ? '⛵' : activeObj.id === 'robot' ? '🤖' : '🐱'}
                    </span>
                    {activeObj.name}
                  </motion.h2>

                  <p className="font-bold text-orange-nav text-sm">
                    ✂️ Terdiri dari bangun datar:
                  </p>

                  <div className="space-y-2">
                    {activeObj.parts.map((part, i) => (
                      <motion.div
                        key={part.label + i}
                        className="bg-white rounded-xl p-3 border border-orange-nav/20 flex items-center gap-3 shadow-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i, type: 'spring' }}
                        whileHover={{ x: 4, borderColor: partColors[i % partColors.length] }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: `${partColors[i % partColors.length]}20` }}
                        >
                          <img src={part.src} className="w-8 h-8 object-contain" alt="" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-800">{part.label}</p>
                          <p className="text-[10px] text-gray-500">
                            {mode === 'assemble' ? 'Seret ke posisi' : 'Bagian penyusun'}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    onClick={() => { playSuccess(); setShowParts(!showParts); }}
                    className="btn btn-primary w-full"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {showParts ? '🙈 Sembunyikan Bagian' : '👀 Tunjukkan Bagian'}
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      playClick();
                      setPartPositions({});
                      setShowParts(true);
                      setMode('assemble');
                    }}
                    className="btn btn-secondary w-full"
                    style={{ borderColor: '#4CAF50', color: '#4CAF50' }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    🔄 Mulai Ulang
                  </motion.button>

                  <div style={{ background: 'rgba(255,140,0,0.08)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} className="p-4">
                    <p className="text-xs font-bold text-center" style={{ color: 'var(--color-text-muted)' }}>
                      💡 Setiap benda di sekitar kita tersusun dari bangun datar!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

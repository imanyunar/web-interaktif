import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

interface ShapePiece {
  id: string;
  label: string;
  shape: string;
  color: string;
  placed: boolean;
}

interface TargetObj {
  id: string;
  name: string;
  description: string;
  pieces: ShapePiece[];
  preview: string;
}

const targets: TargetObj[] = [
  {
    id: 'rumah',
    name: 'Rumah',
    description: 'Susun bangun datar untuk membentuk rumah!',
    preview: '/assets/obj/obj_rumah_geometri.png',
    pieces: [
      { id: 'atap', label: 'Atap (Segitiga)', shape: 'segitiga', color: '#E03030', placed: false },
      { id: 'dinding', label: 'Dinding (Persegi)', shape: 'persegi', color: '#4CAF50', placed: false },
      { id: 'pintu', label: 'Pintu (Persegi Panjang)', shape: 'persegi-panjang', color: '#8B4513', placed: false },
    ],
  },
  {
    id: 'perahu',
    name: 'Perahu',
    description: 'Susun bangun datar untuk membentuk perahu!',
    preview: '/assets/obj/obj_perahu_geometri.png',
    pieces: [
      { id: 'badan', label: 'Badan (Trapesium)', shape: 'trapesium', color: '#795548', placed: false },
      { id: 'tiang', label: 'Tiang (Persegi Panjang)', shape: 'persegi-panjang', color: '#5D4037', placed: false },
      { id: 'layar', label: 'Layar (Segitiga)', shape: 'segitiga', color: '#2196F3', placed: false },
    ],
  },
];

const shapeImages: Record<string, string> = {
  segitiga: '/assets/shape/shape_segitiga.png',
  persegi: '/assets/shape/shape_persegi.png',
  'persegi-panjang': '/assets/shape/shape_persegi_panjang.png',
  trapesium: '/assets/shape/shape_trapesium.png',
};

function DropZone({
  piece,
  onDrop,
  completed,
}: {
  piece: ShapePiece;
  onDrop: () => void;
  completed: boolean;
}) {
  const [{ isOver }, setState] = useState({ isOver: false });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setState({ isOver: true });
  }, []);

  const handleDragLeave = useCallback(() => {
    setState({ isOver: false });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('text/plain');
      if (data === piece.id) {
        onDrop();
      }
      setState({ isOver: false });
    },
    [piece.id, onDrop]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full aspect-square rounded-2xl border-3 border-dashed flex items-center justify-center transition-all ${
        completed
          ? 'border-green-400 bg-green-100/60'
          : isOver
            ? 'border-orange-nav bg-orange-nav/10 scale-105'
            : 'border-gray-300 bg-white/40'
      }`}
    >
      {completed ? (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-center"
        >
          <img src={shapeImages[piece.shape]} className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto" alt="" />
          <p className="text-xs font-bold text-green-600 mt-1">✓ {piece.label}</p>
        </motion.div>
      ) : (
        <p className="text-xs md:text-sm font-bold text-gray-400 text-center px-2">
          {piece.label}
        </p>
      )}
    </div>
  );
}

function DraggablePiece({
  piece,
  onDragStart,
  disabled,
}: {
  piece: ShapePiece;
  onDragStart: (id: string) => void;
  disabled: boolean;
}) {
  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData('text/plain', piece.id);
      e.dataTransfer.effectAllowed = 'move';
      onDragStart(piece.id);
    },
    [piece.id, onDragStart]
  );

  if (disabled) return null;

  return (
    <motion.div
      className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl shadow-md border-2 border-orange-nav/20 hover:shadow-lg select-none"
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        draggable
        onDragStart={handleDragStart}
        className="flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing"
      >
        <img src={shapeImages[piece.shape]} className="w-14 h-14 md:w-20 md:h-20 object-contain pointer-events-none" alt={piece.label} />
        <p className="text-[10px] md:text-xs font-bold text-gray-700 text-center">{piece.label}</p>
        <p className="text-[8px] text-orange-nav font-bold">⬡ Seret</p>
      </div>
    </motion.div>
  );
}

export default function PracticePage() {
  const [activeTarget, setActiveTarget] = useState<TargetObj>(targets[0]);
  const [pieces, setPieces] = useState<ShapePiece[]>(targets[0].pieces.map((p) => ({ ...p })));
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { playClick, playSuccess, playDrop } = useAudio();

  const switchTarget = (t: TargetObj) => {
    playClick();
    setActiveTarget(t);
    setPieces(t.pieces.map((p) => ({ ...p })));
    setShowSuccess(false);
  };

  const handleDrop = useCallback(
    (pieceId: string) => {
      setPieces((prev) => {
        const updated = prev.map((p) => (p.id === pieceId ? { ...p, placed: true } : p));
        const allPlaced = updated.every((p) => p.placed);
        if (allPlaced) {
          setScore((s) => s + 10);
          playSuccess();
          setTimeout(() => setShowSuccess(true), 300);
        } else {
          playDrop();
        }
        return updated;
      });
    },
    [playSuccess, playDrop]
  );

  const handleDragStart = useCallback(
    (pieceId: string) => {
      const p = pieces.find((x) => x.id === pieceId);
      if (p && !p.placed) playClick();
    },
    [pieces, playClick]
  );

  const allPlaced = pieces.every((p) => p.placed);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-light-cyan)' }}>
      <img src="/assets/bg/bg_petunjuk_langit.png" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" draggable={false} />

      <div className="relative z-10 pb-28">
        <div className="sticky top-0 z-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1.5px solid var(--color-border)' }}>
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
            <img src="/assets/char/char_guru_berdiri.png" className="w-14 md:w-20 drop-shadow-lg" alt="" />
            <p className="font-bold text-lg md:text-xl" style={{ color: 'var(--color-text)' }}>
              Seret bangun datar ke kotak yang sesuai!
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 mt-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {targets.map((t) => (
              <motion.button
                key={t.id}
                onClick={() => switchTarget(t)}
                className={`btn !rounded-[14px] !py-2 !px-5 text-sm`}
                style={{
                  background: activeTarget.id === t.id ? 'var(--color-primary)' : 'white',
                  color: activeTarget.id === t.id ? 'white' : 'var(--color-text)',
                  border: `2px solid ${activeTarget.id === t.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t.name}
              </motion.button>
            ))}
          </div>

          <div className="card-glass !w-full !max-w-none overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-6 md:p-8">
                <h2 className="text-2xl font-black text-gray-800 mb-2">{activeTarget.name}</h2>
                <p className="text-sm text-gray-600 font-semibold mb-4">{activeTarget.description}</p>

                <div className="relative bg-white/60 rounded-2xl p-4 border-2 border-gray-200 mb-4">
                  <img
                    src={activeTarget.preview}
                    className="w-full max-w-[200px] mx-auto object-contain opacity-50"
                    alt={activeTarget.name}
                    draggable={false}
                  />
                  {allPlaced && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="bg-green-500 text-white px-6 py-3 rounded-2xl font-black text-xl shadow-xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        ✓ Lengkap!
                      </motion.div>
                    </motion.div>
                  )}
                </div>

                <div style={{ background: 'rgba(255,140,0,0.10)', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', padding: 'var(--space-md)' }}>
                  <p className="font-black text-sm mb-2" style={{ color: 'var(--color-primary)' }}>⭐ Skor: {score}</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
                      initial={{ width: '0%' }}
                      animate={{ width: `${(pieces.filter((p) => p.placed).length / pieces.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs font-bold mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {pieces.filter((p) => p.placed).length} / {pieces.length} selesai
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 p-6 md:p-8 bg-white/40">
                <p className="font-bold text-gray-700 mb-3">📦 Kotak Pasangan:</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {pieces.map((piece) => (
                    <DropZone
                      key={piece.id}
                      piece={piece}
                      onDrop={() => handleDrop(piece.id)}
                      completed={piece.placed}
                    />
                  ))}
                </div>

                <p className="font-bold text-gray-700 mb-3">🧩 Bangun Datar:</p>
                <div className="grid grid-cols-3 gap-3">
                  {pieces.map((piece) => (
                    <DraggablePiece
                      key={piece.id}
                      piece={piece}
                      onDragStart={handleDragStart}
                      disabled={piece.placed}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={() => {
                    playClick();
                    setPieces(activeTarget.pieces.map((p) => ({ ...p })));
                    setShowSuccess(false);
                  }}
                  className="btn btn-primary w-full"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  🔄 Mulai Ulang
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-sm mx-4"
              initial={{ scale: 0.5, y: 60 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 60 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">Selamat!</h2>
              <p className="text-gray-600 font-semibold mb-4">
                Kamu berhasil menyusun <span className="text-orange-nav font-black">{activeTarget.name}</span>!
              </p>
              <p className="text-4xl font-black text-orange-nav mb-4">+10 ⭐</p>
              <motion.button
                onClick={() => setShowSuccess(false)}
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lanjutkan
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shapes } from '../data/shapes';
import { calculateArea, calculatePerimeter } from '../utils/geometry';
import { useAudio } from '../hooks/useAudio';

interface RealObject {
  id: string; name: string; image: string; shapeId: string; description: string;
  vertices: { label: string; x: number; y: number; angle: number }[];
  sides: { label: string; x1: number; y1: number; x2: number; y2: number; length: number }[];
}

const realObjects: RealObject[] = [
  { id: 'sandwich', name: 'Sandwich', image: '/assets/obj/obj_sandwich_segitiga.png', shapeId: 'segitiga', description: 'Sandwich dipotong menjadi bentuk segitiga. Mari kita amati!', vertices: [{ label: 'A', x: 50, y: 8, angle: 60 }, { label: 'B', x: 8, y: 85, angle: 60 }, { label: 'C', x: 92, y: 85, angle: 60 }], sides: [{ label: 'AB', x1: 50, y1: 8, x2: 8, y2: 85, length: 12 }, { label: 'BC', x1: 8, y1: 85, x2: 92, y2: 85, length: 12 }, { label: 'CA', x1: 92, y1: 85, x2: 50, y2: 8, length: 12 }] },
  { id: 'penggaris', name: 'Penggaris Segitiga', image: '/assets/obj/obj_penggaris_segitiga.png', shapeId: 'segitiga', description: 'Penggaris berbentuk segitiga siku-siku. Ada sudut 90°!', vertices: [{ label: 'A', x: 50, y: 8, angle: 90 }, { label: 'B', x: 8, y: 88, angle: 45 }, { label: 'C', x: 92, y: 88, angle: 45 }], sides: [{ label: 'AB', x1: 50, y1: 8, x2: 8, y2: 88, length: 14 }, { label: 'BC', x1: 8, y1: 88, x2: 92, y2: 88, length: 20 }, { label: 'CA', x1: 92, y1: 88, x2: 50, y2: 8, length: 14 }] },
  { id: 'rambu', name: 'Rambu Lalu Lintas', image: '/assets/obj/obj_rambu_lalu_lintas.png', shapeId: 'segitiga', description: 'Rambu lalu lintas berbentuk segitiga!', vertices: [{ label: 'A', x: 50, y: 5, angle: 60 }, { label: 'B', x: 5, y: 88, angle: 60 }, { label: 'C', x: 95, y: 88, angle: 60 }], sides: [{ label: 'AB', x1: 50, y1: 5, x2: 5, y2: 88, length: 15 }, { label: 'BC', x1: 5, y1: 88, x2: 95, y2: 88, length: 15 }, { label: 'CA', x1: 95, y1: 88, x2: 50, y2: 5, length: 15 }] },
  { id: 'gantungan', name: 'Gantungan Baju', image: '/assets/obj/obj_gantungan_baju.png', shapeId: 'segitiga', description: 'Gantungan baju bentuknya segitiga!', vertices: [{ label: 'A', x: 50, y: 5, angle: 40 }, { label: 'B', x: 5, y: 90, angle: 70 }, { label: 'C', x: 95, y: 90, angle: 70 }], sides: [{ label: 'AB', x1: 50, y1: 5, x2: 5, y2: 90, length: 18 }, { label: 'BC', x1: 5, y1: 90, x2: 95, y2: 90, length: 22 }, { label: 'CA', x1: 95, y1: 90, x2: 50, y2: 5, length: 18 }] },
  { id: 'papan_tulis', name: 'Papan Tulis', image: '/assets/obj/obj_papan_tulis.png', shapeId: 'persegi-panjang', description: 'Papan tulis di kelas berbentuk persegi panjang!', vertices: [{ label: 'A', x: 8, y: 8, angle: 90 }, { label: 'B', x: 92, y: 8, angle: 90 }, { label: 'C', x: 92, y: 88, angle: 90 }, { label: 'D', x: 8, y: 88, angle: 90 }], sides: [{ label: 'AB', x1: 8, y1: 8, x2: 92, y2: 8, length: 24 }, { label: 'BC', x1: 92, y1: 8, x2: 92, y2: 88, length: 16 }, { label: 'CD', x1: 92, y1: 88, x2: 8, y2: 88, length: 24 }, { label: 'DA', x1: 8, y1: 88, x2: 8, y2: 8, length: 16 }] },
  { id: 'tas', name: 'Tas Belanja', image: '/assets/obj/obj_tas_belanja.png', shapeId: 'persegi-panjang', description: 'Tas belanja berbentuk persegi panjang!', vertices: [{ label: 'A', x: 10, y: 5, angle: 90 }, { label: 'B', x: 90, y: 5, angle: 90 }, { label: 'C', x: 90, y: 88, angle: 90 }, { label: 'D', x: 10, y: 88, angle: 90 }], sides: [{ label: 'AB', x1: 10, y1: 5, x2: 90, y2: 5, length: 20 }, { label: 'BC', x1: 90, y1: 5, x2: 90, y2: 88, length: 18 }, { label: 'CD', x1: 90, y1: 88, x2: 10, y2: 88, length: 20 }, { label: 'DA', x1: 10, y1: 88, x2: 10, y2: 5, length: 18 }] },
  { id: 'jam', name: 'Jam Dinding', image: '/assets/obj/obj_jam_dinding.png', shapeId: 'lingkaran', description: 'Jam dinding berbentuk lingkaran!', vertices: [], sides: [] },
  { id: 'tricky', name: 'Mainan Segitiga', image: '/assets/obj/obj_tricky_triangle.png', shapeId: 'segitiga', description: 'Mainan segitiga! 3 sisi dan 3 sudut.', vertices: [{ label: 'A', x: 50, y: 6, angle: 55 }, { label: 'B', x: 6, y: 86, angle: 65 }, { label: 'C', x: 94, y: 86, angle: 60 }], sides: [{ label: 'AB', x1: 50, y1: 6, x2: 6, y2: 86, length: 13 }, { label: 'BC', x1: 6, y1: 86, x2: 94, y2: 86, length: 16 }, { label: 'CA', x1: 94, y1: 86, x2: 50, y2: 6, length: 13 }] },
];

const accentColors: Record<string, string> = { persegi: '#4CAF50', 'persegi-panjang': '#2196F3', segitiga: '#E03030', 'jajar-genjang': '#FF9800', 'belah-ketupat': '#9C27B0', 'layang-layang': '#E91E63', trapesium: '#795548', lingkaran: '#E8A020' };

export default function ExplorePage() {
  const [tab, setTab] = useState<'real' | 'shapes'>('real');
  const [selectedObj, setSelectedObj] = useState(realObjects[0]);
  const [selectedShape, setSelectedShape] = useState(shapes[0]);
  const [size, setSize] = useState(7);
  const [clickedVertex, setClickedVertex] = useState<string | null>(null);
  const [clickedSide, setClickedSide] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [observations, setObservations] = useState<Record<string, string>>({});
  const { playClick, playSuccess } = useAudio();
  const realShape = shapes.find((s) => s.id === selectedObj.shapeId)!;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <div className="relative z-10 pb-24">
        <div className="sticky top-0 z-card" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1.5px solid var(--color-border)' }}>
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
            <img src="/assets/char/char_guru_berbicara.png" className="w-12 md:w-16 drop-shadow-lg shrink-0" alt="" />
            <p className="font-bold text-base md:text-lg" style={{ color: 'var(--color-text)' }}>
              {tab === 'real' ? '👀 Ayo amati benda di sekitar kita! Klik titik dan sisinya.' : '🔷 Yuk pelajari 8 bangun datar!'}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 mt-4">
          <div className="flex gap-2 mb-4">
            <button onClick={() => { playClick(); setTab('real'); }}
              className="btn !rounded-[14px]"
              style={{ background: tab === 'real' ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' : 'white', color: tab === 'real' ? 'white' : 'var(--color-text)', border: tab === 'real' ? 'none' : '2px solid var(--color-border)', boxShadow: tab === 'real' ? 'var(--shadow-btn)' : 'var(--shadow-sm)' }}>
              🌍 Benda Nyata
            </button>
            <button onClick={() => { playClick(); setTab('shapes'); }}
              className="btn !rounded-[14px]"
              style={{ background: tab === 'shapes' ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' : 'white', color: tab === 'shapes' ? 'white' : 'var(--color-text)', border: tab === 'shapes' ? 'none' : '2px solid var(--color-border)', boxShadow: tab === 'shapes' ? 'var(--shadow-btn)' : 'var(--shadow-sm)' }}>
              📐 Bangun Datar
            </button>
          </div>

          <AnimatePresence mode="wait">
            {tab === 'real' ? (
              <motion.div key="real" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {realObjects.map((obj) => (
                    <button key={obj.id} onClick={() => { playClick(); setSelectedObj(obj); setClickedVertex(null); setClickedSide(null); setShowTable(false); }}
                      className="btn !rounded-[14px] !py-2 !px-4 text-sm"
                      style={{ background: selectedObj.id === obj.id ? 'var(--color-primary)' : 'white', color: selectedObj.id === obj.id ? 'white' : 'var(--color-text)', border: `2px solid ${selectedObj.id === obj.id ? 'var(--color-primary)' : 'var(--color-border)'}` }}>
                      {obj.name}
                    </button>
                  ))}
                </div>

                <div className="card !w-full !max-w-none flex flex-col md:flex-row gap-6">
                  <div className="md:w-3/5 flex flex-col items-center">
                    <div className="relative w-full max-w-sm aspect-square">
                      <img src={selectedObj.image} className="w-full h-full object-contain drop-shadow-xl rounded-2xl" alt="" draggable={false} />
                      {selectedObj.vertices.map((v) => (
                        <motion.button key={v.label} onClick={() => { playClick(); setClickedVertex(v.label); setClickedSide(null); setTimeout(() => setClickedVertex(null), 2000); }}
                          className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-white border-3 shadow-lg flex items-center justify-center cursor-pointer z-btn hover:scale-125 transition-transform"
                          style={{ left: `${v.x}%`, top: `${v.y}%`, borderColor: accentColors[selectedObj.shapeId] || '#D2852E' }}
                          whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}>
                          <span className="text-[10px] font-black" style={{ color: accentColors[selectedObj.shapeId] }}>{v.label}</span>
                        </motion.button>
                      ))}
                      {selectedObj.sides.map((s) => (
                        <motion.button key={s.label} onClick={() => { playClick(); setClickedSide(s.label); setClickedVertex(null); setTimeout(() => setClickedSide(null), 2000); }}
                          className="absolute px-2 py-1 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white/90 border-2 border-blue-400 shadow-md flex items-center gap-1 cursor-pointer z-btn"
                          style={{ left: `${(s.x1 + s.x2) / 2}%`, top: `${(s.y1 + s.y2) / 2}%` }}
                          whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <span className="text-[8px] font-black text-blue-600">{s.label}</span>
                        </motion.button>
                      ))}
                      {clickedVertex && (
                        <motion.div className="absolute top-2 right-2 bg-white rounded-xl px-4 py-2 shadow-xl border-2 z-card" style={{ borderColor: accentColors[selectedObj.shapeId] }}
                          initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <p className="text-sm font-black">Sudut {clickedVertex} = {selectedObj.vertices.find((v) => v.label === clickedVertex)?.angle}°</p>
                        </motion.div>
                      )}
                      {clickedSide && (
                        <motion.div className="absolute top-2 left-2 bg-white rounded-xl px-4 py-2 shadow-xl border-2 border-blue-400 z-card"
                          initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <p className="text-sm font-black">Sisi {clickedSide} = {selectedObj.sides.find((s) => s.label === clickedSide)?.length} cm</p>
                        </motion.div>
                      )}
                    </div>
                    <p className="font-semibold text-center mt-3 max-w-sm" style={{ color: 'var(--color-text-muted)' }}>{selectedObj.description}</p>
                    <button onClick={() => { playClick(); setShowTable(!showTable); }}
                      className="btn !rounded-[14px] !py-2 !px-4 text-sm mt-3"
                      style={{ background: showTable ? '#4CAF50' : 'white', color: showTable ? 'white' : '#4CAF50', border: '2px solid #4CAF50' }}>
                      📊 {showTable ? 'Tutup Tabel' : 'Tabel Pengamatan'}
                    </button>
                  </div>

                  <div className="md:w-2/5 space-y-4">
                    <h2 style={{ color: 'var(--color-text)' }}>📝 Lembar Pengamatan</h2>
                    <div className="rounded-xl p-4" style={{ background: '#FFF0E0', border: '2px solid var(--color-border)' }}>
                      <p className="font-bold text-sm" style={{ color: 'var(--color-primary)' }}>🔍 Petunjuk Eksplorasi:</p>
                      <ol className="text-xs mt-2 space-y-1 list-decimal list-inside" style={{ color: 'var(--color-text-muted)' }}>
                        <li>Amati bentuk benda pada gambar</li>
                        <li>Klik titik <strong style={{ color: accentColors[selectedObj.shapeId] }}>A, B, C, D</strong> untuk melihat besar sudut</li>
                        <li>Klik sisi <strong className="text-blue-600">AB, BC, CD, DA</strong> untuk melihat panjang</li>
                        <li>Catat hasilnya di tabel pengamatan</li>
                        <li>Tarik kesimpulan tentang jenis bangun datar</li>
                      </ol>
                    </div>

                    <AnimatePresence>
                      {showTable && (
                        <motion.div className="rounded-xl overflow-hidden border-2" style={{ borderColor: '#A5D6A7' }} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                          <div className="p-3 font-black text-sm" style={{ background: '#E8F5E9', color: '#2E7D32', borderBottom: '2px solid #A5D6A7' }}>
                            📊 Tabel Pengamatan
                          </div>
                          <div className="p-3 space-y-2" style={{ background: 'white' }}>
                            {selectedObj.vertices.map((v) => (
                              <div key={v.label} className="flex items-center gap-2">
                                <span className="font-bold text-sm min-w-[4ch]">Sudut {v.label}</span>
                                <input placeholder="...°" value={observations[`angle-${v.label}`] || ''}
                                  onChange={(e) => setObservations((p) => ({ ...p, [`angle-${v.label}`]: e.target.value }))}
                                  className="flex-1 px-2 py-1 text-sm border rounded-lg" style={{ borderColor: 'var(--color-border)' }} />
                                <button onClick={() => { playClick(); setObservations((p) => ({ ...p, [`angle-${v.label}`]: `${v.angle}°` })); }}
                                  className="px-2 py-1 text-[10px] font-bold rounded-lg cursor-pointer border-none" style={{ background: '#FFF0E0', color: 'var(--color-primary)' }}>
                                  Isi
                                </button>
                              </div>
                            ))}
                            {selectedObj.sides.map((s) => (
                              <div key={s.label} className="flex items-center gap-2">
                                <span className="font-bold text-sm min-w-[4ch]">Sisi {s.label}</span>
                                <input placeholder="... cm" value={observations[`side-${s.label}`] || ''}
                                  onChange={(e) => setObservations((p) => ({ ...p, [`side-${s.label}`]: e.target.value }))}
                                  className="flex-1 px-2 py-1 text-sm border rounded-lg" style={{ borderColor: 'var(--color-border)' }} />
                                <button onClick={() => { playClick(); setObservations((p) => ({ ...p, [`side-${s.label}`]: `${s.length} cm` })); }}
                                  className="px-2 py-1 text-[10px] font-bold rounded-lg cursor-pointer border-none" style={{ background: '#FFF0E0', color: 'var(--color-primary)' }}>
                                  Isi
                                </button>
                              </div>
                            ))}
                            <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                              <p className="font-bold text-sm mb-1">💡 Kesimpulan:</p>
                              <p className="text-sm font-semibold" style={{ color: accentColors[selectedObj.shapeId] }}>
                                {selectedObj.name} berbentuk <strong>{realShape.name}</strong>
                              </p>
                              <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{realShape.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="rounded-xl p-4" style={{ background: '#FFF0E0', border: '2px solid var(--color-border)' }}>
                      <p className="font-bold text-sm" style={{ color: accentColors[selectedObj.shapeId] }}>🎯 Bentuk: {realShape.name}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {realShape.properties.map((p) => (
                          <span key={p.label} className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: '#FFF0E0', color: 'var(--color-primary-dark)' }}>
                            {p.label}: {p.value}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => { playSuccess(); setObservations({}); setClickedVertex(null); setClickedSide(null); }}
                      className="btn btn-primary w-full justify-center">
                      🔄 Mulai Ulang
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="shapes" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3 mb-6">
                  {shapes.map((s, i) => (
                    <motion.button key={s.id} onClick={() => { playClick(); setSelectedShape(s); }}
                      className="rounded-2xl p-2 md:p-3 cursor-pointer transition-all border-2"
                      style={{ background: selectedShape.id === s.id ? 'white' : 'rgba(255,255,255,0.80)', borderColor: selectedShape.id === s.id ? 'var(--color-primary)' : 'transparent', boxShadow: selectedShape.id === s.id ? 'var(--shadow-md)' : 'var(--shadow-sm)' }}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}
                      whileHover={{ scale: 1.08, y: -3 }} whileTap={{ scale: 0.92 }}>
                      <img src={`/assets/shape/shape_${s.id}.png`} className="w-full aspect-square object-contain drop-shadow-md" alt={s.name} draggable={false} />
                      <p className="text-center font-bold text-[10px] md:text-xs mt-1" style={{ color: selectedShape.id === s.id ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>{s.name}</p>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={selectedShape.id} className="card !w-full !max-w-none flex flex-col md:flex-row gap-6"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <div className="md:w-5/12 flex flex-col items-center justify-center p-4 rounded-2xl" style={{ background: `${accentColors[selectedShape.id]}08` }}>
                      <img src={`/assets/shape/shape_${selectedShape.id}.png`} className="w-36 md:w-44 aspect-square object-contain drop-shadow-xl" alt="" draggable={false} />
                      <h2 className="text-2xl md:text-3xl font-black mt-3">{selectedShape.name}</h2>
                      <p className="text-sm font-bold" style={{ color: 'var(--color-text-muted)' }}>{selectedShape.nameEn}</p>
                    </div>
                    <div className="md:w-7/12 space-y-4">
                      <p className="font-semibold leading-relaxed">{selectedShape.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedShape.properties.map((p) => (
                          <div key={p.label} className="rounded-xl p-3 border" style={{ background: 'white', borderColor: `${accentColors[selectedShape.id]}30` }}>
                            <p className="text-[10px] font-bold uppercase" style={{ color: accentColors[selectedShape.id] }}>{p.label}</p>
                            <p className="font-bold text-sm">{p.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl p-4 border" style={{ background: `${accentColors[selectedShape.id]}10`, borderColor: `${accentColors[selectedShape.id]}30` }}>
                        <p className="font-black text-sm" style={{ color: accentColors[selectedShape.id] }}>📝 Rumus:</p>
                        <p className="font-bold" style={{ color: accentColors[selectedShape.id] }}>Luas = {selectedShape.areaFormula}</p>
                        <p className="font-bold" style={{ color: accentColors[selectedShape.id] }}>Keliling = {selectedShape.perimeterFormula}</p>
                      </div>
                      <div className="rounded-xl p-4 border" style={{ background: '#E3F2FD', borderColor: '#90CAF9' }}>
                        <p className="font-black text-sm" style={{ color: '#1565C0' }}>🧮 Hitung Langsung:</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="font-bold text-sm" style={{ color: '#1565C0' }}>Nilai =</span>
                          <input type="range" min="1" max="15" value={size} onChange={(e) => setSize(Number(e.target.value))} className="flex-1 h-2" style={{ accentColor: accentColors[selectedShape.id] }} />
                          <span className="font-black text-lg min-w-[2ch]" style={{ color: accentColors[selectedShape.id] }}>{size}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                            <p className="text-[10px] font-bold uppercase" style={{ color: 'var(--color-text-muted)' }}>Luas</p>
                            <p className="font-black text-2xl" style={{ color: accentColors[selectedShape.id] }}>{calculateArea(selectedShape.id, size, size * 0.7, size * 0.5).toFixed(1)}</p>
                          </div>
                          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                            <p className="text-[10px] font-bold uppercase" style={{ color: 'var(--color-text-muted)' }}>Keliling</p>
                            <p className="font-black text-2xl" style={{ color: '#1565C0' }}>{calculatePerimeter(selectedShape.id, size, size * 0.7, size * 0.5, size * 0.5).toFixed(1)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

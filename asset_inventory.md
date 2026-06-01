# Asset Inventory - Media Pembelajaran Bangun Datar

## Sumber Aset
- Video Referensi: https://youtu.be/j-j48wndgss
- File Lokal: `Video/Copy of Salinan dari BERANDA.mp4`

## Aset Visual (SVG Components)

### Backgrounds
| Nama | Lokasi Video | Fungsi | Path Komponen |
|------|-------------|--------|---------------|
| Sky Gradient Park | Scene 1 (0:00-0:06), Scene 9 (3:20-3:26) | Taman outdoor | `src/components/AnimatedBackground.tsx` (variant: 'park') |
| Classroom Warm | Scene 4b (0:30-0:40), Scene 7 (1:46-1:50) | Ruang kelas hangat | `AnimatedBackground.tsx` (variant: 'classroom') |
| Teal Teaching | Scene 5-8 (0:40-3:20) | Background pengajaran | `AnimatedBackground.tsx` (variant: 'teal') |

### Karakter
| Nama | Lokasi | Fungsi | File |
|------|--------|--------|------|
| Karakter Anak | Scene 1, 9 | Tokoh utama | `src/components/Character.tsx` (variant: 'child') |
| Karakter Guru | Scene 4, 7, 10 | Pengajar | `Character.tsx` (variant: 'teacher') |

### Dekorasi Alam
| Nama | Lokasi | Fungsi |
|------|--------|--------|
| Awan | Scene 1, 9 | Animasi latar | `src/components/Cloud.tsx` |
| Pohon | Scene 1, 9 | Dekorasi taman | `AnimatedBackground.tsx` (SVG trees) |
| Rumput | Scene 1, 9 | Dekorasi tanah | `AnimatedBackground.tsx` |
| Bunga | Scene 1, 9 | Dekorasi | `AnimatedBackground.tsx` (flower SVGs) |
| Pagar | Scene 1 | Batas taman | `AnimatedBackground.tsx` (grass elements) |

### Shape / Bangun Datar
| Nama | Warna | Lokasi Video | Fungsi |
|------|-------|-------------|--------|
| Persegi (Square) | Hijau (#4CAF50) | Scene 6, 8b | Bangun datar 4 sisi sama |
| Persegi Panjang | Biru (#2196F3) | Scene 6 | Bangun datar 4 sisi beda |
| Segitiga (Triangle) | Merah (#E03030) | Scene 5, 8f | Bangun datar 3 sisi |
| Jajar Genjang | Oranye (#FF9800) | Scene 8 | Bangun datar 4 sisi miring |
| Belah Ketupat | Ungu (#9C27B0) | Scene 8 | Bangun datar 4 sisi diagonal |
| Layang-layang | Pink (#E91E63) | Scene 8 | Bangun datar 4 sisi khusus |
| Trapesium | Coklat (#795548) | Scene 8 | Bangun datar 1 pasang sejajar |
| Lingkaran | Kuning (#E8E06E) | Scene 7 | Bangun datar 0 sisi |

### Audio (Generated via Web Audio API)
| Nama | Deskripsi | Fungsi |
|------|-----------|--------|
| Click Tone | 800Hz sine 50ms | Interaksi tombol |
| Success Jingle | 523Hz→659Hz→784Hz ascending | Jawaban benar |
| Error Tone | 200Hz→150Hz descending | Jawaban salah |
| Drag Sound | 600Hz sine 30ms | Drag/drop shape |
| Drop Sound | 500Hz→700Hz 100ms | Drop shape |

### Warna (Palette)
| Nama | Hex | Penggunaan |
|------|-----|-----------|
| Pastel Teal | #84AD48 | Background utama pengajaran |
| Pastel Blue | #D2EBEC | Background sub-scene |
| Warm Cream | #D2C490 | Segmen guru |
| Nature Green | #97B273 | Scene outdoor taman |
| Flash Blue | #D3EBFC | Transisi antar scene |
| Orange Nav | #D2852E | Navigation bar |
| Yellow Shape | #E8E06E | Shape lingkaran |
| Red Shape | #E03030 | Shape segitiga |

### Font
| Nama | Sumber | Penggunaan |
|------|--------|-----------|
| Nunito | Google Fonts | Headings, body text |

### Animasi
| Nama | Teknik | Elemen |
|------|--------|--------|
| Cloud Float | Framer Motion translateX loop | Awan bergerak horizontal |
| Floating | Framer Motion translateY loop | Karakter, bunga |
| Parallax | CSS + Motion | Background trees |
| Fade In | Motion opacity | Semua elemen masuk |
| Scale In | Motion scale | Tombol, shape selection |
| Bounce | Motion spring | Tombol START |
| Rotate | Motion rotate | Shape rotation |
| Slide | Motion x translate | Page transitions |

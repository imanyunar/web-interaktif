export interface ShapeDefinition {
  id: string;
  name: string;
  nameEn: string;
  sides: number;
  angles: number;
  color: string;
  fillColor: string;
  areaFormula: string;
  perimeterFormula: string;
  description: string;
  properties: { label: string; value: string }[];
}

export const shapes: ShapeDefinition[] = [
  { id: 'persegi', name: 'Persegi', nameEn: 'Square', sides: 4, angles: 4, color: '#4CAF50', fillColor: '#81C784', areaFormula: 's × s', perimeterFormula: '4 × s', description: 'Persegi memiliki 4 sisi sama panjang dan 4 sudut siku-siku (90°).', properties: [{ label: 'Sisi', value: '4 sama panjang' }, { label: 'Sudut', value: '4 × 90°' }, { label: 'Diagonal', value: 'Sama panjang' }, { label: 'Simetri Lipat', value: '4' }] },
  { id: 'persegi-panjang', name: 'Persegi Panjang', nameEn: 'Rectangle', sides: 4, angles: 4, color: '#2196F3', fillColor: '#64B5F6', areaFormula: 'p × l', perimeterFormula: '2 × (p+l)', description: 'Persegi panjang memiliki 2 pasang sisi sejajar sama panjang dan 4 sudut siku-siku.', properties: [{ label: 'Sisi', value: '2 pasang' }, { label: 'Sudut', value: '4 × 90°' }, { label: 'Diagonal', value: 'Sama panjang' }, { label: 'Simetri Lipat', value: '2' }] },
  { id: 'segitiga', name: 'Segitiga', nameEn: 'Triangle', sides: 3, angles: 3, color: '#E03030', fillColor: '#E57373', areaFormula: '½ × a × t', perimeterFormula: 'a + b + c', description: 'Segitiga memiliki 3 sisi dan 3 sudut. Jumlah ketiga sudutnya 180°.', properties: [{ label: 'Sisi', value: '3' }, { label: 'Sudut', value: '3 (total 180°)' }, { label: 'Tinggi', value: 'Garis tegak lurus' }, { label: 'Jenis', value: 'Siku, sama kaki, sembarang' }] },
  { id: 'jajar-genjang', name: 'Jajar Genjang', nameEn: 'Parallelogram', sides: 4, angles: 4, color: '#FF9800', fillColor: '#FFB74D', areaFormula: 'a × t', perimeterFormula: '2 × (a+b)', description: 'Jajar genjang memiliki 2 pasang sisi sejajar. Sudut di depan sama besar.', properties: [{ label: 'Sisi', value: '2 pasang sejajar' }, { label: 'Sudut', value: 'Berhadapan sama' }, { label: 'Diagonal', value: 'Tidak sama' }, { label: 'Tinggi', value: 'Jarak sisi sejajar' }] },
  { id: 'belah-ketupat', name: 'Belah Ketupat', nameEn: 'Rhombus', sides: 4, angles: 4, color: '#9C27B0', fillColor: '#CE93D8', areaFormula: '½ × d1 × d2', perimeterFormula: '4 × s', description: 'Belah ketupat memiliki 4 sisi sama panjang dengan sudut berhadapan sama besar.', properties: [{ label: 'Sisi', value: '4 sama panjang' }, { label: 'Sudut', value: 'Berhadapan sama' }, { label: 'Diagonal', value: 'Saling tegak lurus' }, { label: 'Simetri', value: '2 sumbu' }] },
  { id: 'layang-layang', name: 'Layang-layang', nameEn: 'Kite', sides: 4, angles: 4, color: '#E91E63', fillColor: '#F48FB1', areaFormula: '½ × d1 × d2', perimeterFormula: '2 × (a+b)', description: 'Layang-layang memiliki 2 pasang sisi sama panjang dan satu diagonal tegak lurus.', properties: [{ label: 'Sisi', value: '2 pasang sama' }, { label: 'Sudut', value: '1 pasang sama' }, { label: 'Diagonal', value: 'Tegak lurus' }, { label: 'Simetri', value: '1 sumbu' }] },
  { id: 'trapesium', name: 'Trapesium', nameEn: 'Trapezoid', sides: 4, angles: 4, color: '#795548', fillColor: '#A1887F', areaFormula: '½ × (a+b) × t', perimeterFormula: 'a + b + c + d', description: 'Trapesium memiliki sepasang sisi sejajar. Ada trapesium siku, sama kaki, dan sembarang.', properties: [{ label: 'Sisi', value: '1 pasang sejajar' }, { label: 'Sudut', value: '4' }, { label: 'Tinggi', value: 'Jarak sisi sejajar' }, { label: 'Jenis', value: 'Siku, sama kaki' }] },
  { id: 'lingkaran', name: 'Lingkaran', nameEn: 'Circle', sides: 0, angles: 0, color: '#E8A020', fillColor: '#FFF176', areaFormula: 'π × r²', perimeterFormula: '2 × π × r', description: 'Lingkaran adalah bangun datar yang dibatasi oleh garis lengkung (busur).', properties: [{ label: 'Sisi', value: '0 (busur)' }, { label: 'Sudut', value: '0' }, { label: 'Jari-jari', value: 'r' }, { label: 'Diameter', value: '2 × r' }] },
];

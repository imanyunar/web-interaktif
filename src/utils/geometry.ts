export function calculateArea(shapeId: string, a: number, b?: number, c?: number): number {
  switch (shapeId) {
    case 'persegi': return a * a;
    case 'persegi-panjang': return a * (b || a);
    case 'segitiga': return 0.5 * a * (b || a);
    case 'jajar-genjang': return a * (b || a);
    case 'belah-ketupat': return 0.5 * a * (b || a);
    case 'layang-layang': return 0.5 * a * (b || a);
    case 'trapesium': return 0.5 * (a + (b || a)) * (c || a);
    case 'lingkaran': return Math.PI * a * a;
    default: return 0;
  }
}

export function calculatePerimeter(shapeId: string, a: number, b?: number, c?: number, d?: number): number {
  switch (shapeId) {
    case 'persegi': return 4 * a;
    case 'persegi-panjang': return 2 * (a + (b || a));
    case 'segitiga': return a + (b || a) + (c || a);
    case 'jajar-genjang': return 2 * (a + (b || a));
    case 'belah-ketupat': return 4 * a;
    case 'layang-layang': return 2 * (a + (b || a));
    case 'trapesium': return a + (b || a) + (c || a) + (d || a);
    case 'lingkaran': return 2 * Math.PI * a;
    default: return 0;
  }
}

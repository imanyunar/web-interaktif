const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const source = path.join(__dirname, 'assets', 'Gemini_Generated_Image_ow1acuow1acuow1a.png');
const outRoot = path.join(__dirname, 'public', 'gemini_isolated_assets');

const crops = [
  // Backgrounds stay rectangular.
  ['backgrounds', 'bg_beranda_taman.png', 9, 5, 296, 170, false],
  ['backgrounds', 'bg_petunjuk_langit.png', 319, 5, 296, 170, false],
  ['backgrounds', 'bg_tujuan_pembelajaran.png', 627, 5, 296, 170, false],
  ['backgrounds', 'bg_menu_taman.png', 935, 5, 296, 170, false],
  ['backgrounds', 'bg_pertemuan1_lapangan.png', 9, 198, 296, 170, false],
  ['backgrounds', 'bg_eksplorasi_rumput.png', 319, 198, 296, 170, false],
  ['backgrounds', 'bg_penutup.png', 627, 198, 296, 170, false],

  // Characters
  ['characters', 'char_anak_laki_laki.png', 942, 198, 86, 140, true],
  ['characters', 'char_anak_memegang_layang.png', 1022, 190, 126, 154, true],
  ['characters', 'char_anak_perempuan.png', 1142, 198, 98, 142, true],
  ['characters', 'char_kelompok_anak_bermain.png', 1232, 216, 168, 120, true],
  ['characters', 'char_guru_berdiri.png', 12, 390, 108, 176, true],
  ['characters', 'char_guru_menunjuk.png', 132, 390, 116, 176, true],
  ['characters', 'char_guru_berbicara.png', 268, 390, 124, 176, true],
  ['characters', 'char_anak_laki_laki_2.png', 408, 398, 102, 158, true],
  ['characters', 'char_anak_perempuan_2.png', 506, 394, 112, 158, true],
  ['characters', 'char_kelompok_anak_bermain_2.png', 8, 590, 256, 118, true],
  ['characters', 'char_anak_memegang_layang_2.png', 288, 594, 120, 122, true],
  ['characters', 'char_anak_berpikir.png', 408, 586, 114, 138, true],

  // Meeting 1 objects
  ['objects/pertemuan-1', 'obj_gantungan_baju.png', 620, 398, 92, 94, true],
  ['objects/pertemuan-1', 'obj_sandwich_segitiga.png', 720, 394, 96, 100, true],
  ['objects/pertemuan-1', 'obj_rambu_lalu_lintas.png', 832, 390, 92, 106, true],
  ['objects/pertemuan-1', 'obj_jam_dinding.png', 920, 392, 92, 102, true],
  ['objects/pertemuan-1', 'obj_jam_dinding_biru.png', 1010, 392, 92, 102, true],
  ['objects/pertemuan-1', 'obj_papan_tulis.png', 1100, 392, 94, 100, true],
  ['objects/pertemuan-1', 'obj_tas_belanja.png', 1200, 390, 82, 102, true],
  ['objects/pertemuan-1', 'obj_penggaris_segitiga.png', 1308, 392, 80, 100, true],
  ['objects/pertemuan-1', 'obj_tricky_triangle.png', 606, 532, 100, 100, true],

  // Meeting 2 objects
  ['objects/pertemuan-2', 'obj_pola_lantai_engklek.png', 796, 532, 84, 104, true],
  ['objects/pertemuan-2', 'obj_kano.png', 904, 562, 110, 56, true],
  ['objects/pertemuan-2', 'obj_rumah_geometri.png', 1006, 532, 100, 100, true],
  ['objects/pertemuan-2', 'obj_perahu_geometri.png', 1110, 532, 104, 100, true],
  ['objects/pertemuan-2', 'obj_robot_geometri.png', 1212, 532, 90, 104, true],
  ['objects/pertemuan-2', 'obj_kucing_geometri.png', 1302, 532, 96, 102, true],

  // Shapes
  ['shapes', 'shape_segitiga.png', 624, 658, 84, 72, true],
  ['shapes', 'shape_persegi.png', 720, 656, 82, 72, true],
  ['shapes', 'shape_persegi_panjang.png', 812, 668, 100, 50, true],
  ['shapes', 'shape_jajar_genjang.png', 930, 668, 88, 52, true],
  ['shapes', 'shape_belah_ketupat.png', 1034, 650, 82, 84, true],
  ['shapes', 'shape_layang_layang.png', 1134, 650, 80, 84, true],
  ['shapes', 'shape_trapesium.png', 1230, 662, 94, 60, true],
  ['shapes', 'shape_lingkaran.png', 1328, 644, 80, 94, true],
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function colorDistanceSq(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr + dg * dg + db * db;
}

function median(values) {
  values.sort((a, b) => a - b);
  return values[Math.floor(values.length / 2)];
}

function estimateBorderColor(data, width, height) {
  const pixels = [];
  const pushPixel = (x, y) => {
    const i = (y * width + x) * 4;
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  };

  for (let x = 0; x < width; x += 1) {
    pushPixel(x, 0);
    pushPixel(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    pushPixel(0, y);
    pushPixel(width - 1, y);
  }

  return [
    median(pixels.map((pixel) => pixel[0])),
    median(pixels.map((pixel) => pixel[1])),
    median(pixels.map((pixel) => pixel[2])),
  ];
}

function removeConnectedBackground(data, width, height) {
  const bg = estimateBorderColor(data, width, height);
  const thresholdSq = 52 * 52;
  const visited = new Uint8Array(width * height);
  const queue = [];

  const enqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    const i = p * 4;
    if (colorDistanceSq([data[i], data[i + 1], data[i + 2]], bg) > thresholdSq) return;
    visited[p] = 1;
    queue.push(p);
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  for (let head = 0; head < queue.length; head += 1) {
    const p = queue[head];
    const x = p % width;
    const y = Math.floor(p / width);
    enqueue(x + 1, y);
    enqueue(x - 1, y);
    enqueue(x, y + 1);
    enqueue(x, y - 1);
  }

  for (let p = 0; p < visited.length; p += 1) {
    if (visited[p]) {
      const i = p * 4;
      data[i + 3] = 0;
    }
  }

  // Despill semi-background pixels near the removed area.
  for (let p = 0; p < width * height; p += 1) {
    const i = p * 4;
    if (data[i + 3] === 0) continue;
    const dist = Math.sqrt(colorDistanceSq([data[i], data[i + 1], data[i + 2]], bg));
    if (dist < 34) data[i + 3] = Math.max(0, Math.round((dist / 34) * 255));
  }
}

function alphaBounds(data, width, height) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 8) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX || maxY < minY) return null;
  const pad = 3;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);
  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

function removeSmallAlphaComponents(data, width, height, minPixels = 28) {
  const total = width * height;
  const visited = new Uint8Array(total);
  const queue = [];
  const component = [];

  const isOpaque = (p) => data[p * 4 + 3] > 8;
  const clearPixel = (p) => {
    data[p * 4 + 3] = 0;
  };

  for (let start = 0; start < total; start += 1) {
    if (visited[start] || !isOpaque(start)) continue;

    queue.length = 0;
    component.length = 0;
    visited[start] = 1;
    queue.push(start);

    for (let head = 0; head < queue.length; head += 1) {
      const p = queue[head];
      component.push(p);
      const x = p % width;
      const y = Math.floor(p / width);
      const neighbors = [
        x > 0 ? p - 1 : -1,
        x < width - 1 ? p + 1 : -1,
        y > 0 ? p - width : -1,
        y < height - 1 ? p + width : -1,
      ];

      for (const next of neighbors) {
        if (next < 0 || visited[next] || !isOpaque(next)) continue;
        visited[next] = 1;
        queue.push(next);
      }
    }

    if (component.length < minPixels) {
      for (const p of component) clearPixel(p);
    }
  }
}

async function processCrop(crop) {
  const [folder, name, left, top, width, height, isolate] = crop;
  const out = path.join(outRoot, folder, name);
  ensureDir(path.dirname(out));

  if (!isolate) {
    await sharp(source).extract({ left, top, width, height }).png().toFile(out);
    return {
      folder,
      name,
      relativePath: `/gemini_isolated_assets/${folder}/${name}`.replaceAll('\\', '/'),
      crop: { x: left, y: top, width, height },
      isolated: false,
    };
  }

  const raw = await sharp(source)
    .extract({ left, top, width, height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const data = Buffer.from(raw.data);
  removeConnectedBackground(data, width, height);
  removeSmallAlphaComponents(data, width, height);
  const bounds = alphaBounds(data, width, height) || { left: 0, top: 0, width, height };

  await sharp(data, { raw: { width, height, channels: 4 } })
    .extract(bounds)
    .png()
    .toFile(out);

  return {
    folder,
    name,
    relativePath: `/gemini_isolated_assets/${folder}/${name}`.replaceAll('\\', '/'),
    crop: { x: left, y: top, width, height },
    isolated: true,
    trim: bounds,
  };
}

async function main() {
  ensureDir(outRoot);
  const assets = [];
  for (const crop of crops) {
    assets.push(await processCrop(crop));
    console.log(`Saved ${assets.at(-1).relativePath}`);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    generator: 'split_gemini_assets_isolated.cjs',
    source: 'assets/Gemini_Generated_Image_ow1acuow1acuow1a.png',
    method: 'sharp crop + border flood-fill background removal + alpha trim',
    total: assets.length,
    assets,
  };

  fs.writeFileSync(path.join(outRoot, 'asset_manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Isolated ${assets.length} assets into ${outRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

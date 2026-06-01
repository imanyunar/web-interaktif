const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const source = path.join(__dirname, 'assets', 'Gemini_Generated_Image_ow1acuow1acuow1a.png');
const outRoot = path.join(__dirname, 'public', 'gemini_clean_assets');
const tmpRoot = path.join(os.tmpdir(), 'gemini-clean-assets');

// Coordinates are deliberately tighter than the first splitter and avoid the
// white filename labels under each asset. Transparent assets are auto-trimmed
// after background removal, so the final file has clean edges and minimal empty
// padding.
const crops = [
  // Backgrounds
  ['backgrounds', 'bg_beranda_taman.png', 9, 5, 296, 170, false],
  ['backgrounds', 'bg_petunjuk_langit.png', 319, 5, 296, 170, false],
  ['backgrounds', 'bg_tujuan_pembelajaran.png', 627, 5, 296, 170, false],
  ['backgrounds', 'bg_menu_taman.png', 935, 5, 296, 170, false],
  ['backgrounds', 'bg_pertemuan1_lapangan.png', 9, 198, 296, 170, false],
  ['backgrounds', 'bg_eksplorasi_rumput.png', 319, 198, 296, 170, false],
  ['backgrounds', 'bg_penutup.png', 627, 198, 296, 170, false],

  // Characters
  ['characters', 'char_anak_laki_laki.png', 944, 202, 82, 132, true],
  ['characters', 'char_anak_memegang_layang.png', 1024, 194, 123, 145, true],
  ['characters', 'char_anak_perempuan.png', 1144, 200, 94, 136, true],
  ['characters', 'char_kelompok_anak_bermain.png', 1235, 219, 164, 112, true],
  ['characters', 'char_guru_berdiri.png', 15, 394, 101, 168, true],
  ['characters', 'char_guru_menunjuk.png', 136, 394, 108, 168, true],
  ['characters', 'char_guru_berbicara.png', 272, 394, 116, 168, true],
  ['characters', 'char_anak_laki_laki_2.png', 412, 402, 94, 150, true],
  ['characters', 'char_anak_perempuan_2.png', 510, 398, 104, 150, true],
  ['characters', 'char_kelompok_anak_bermain_2.png', 10, 594, 250, 108, true],
  ['characters', 'char_anak_memegang_layang_2.png', 292, 598, 112, 114, true],
  ['characters', 'char_anak_berpikir.png', 412, 590, 106, 128, true],

  // Meeting 1 objects
  ['objects/pertemuan-1', 'obj_gantungan_baju.png', 622, 402, 88, 86, true],
  ['objects/pertemuan-1', 'obj_sandwich_segitiga.png', 724, 397, 90, 92, true],
  ['objects/pertemuan-1', 'obj_rambu_lalu_lintas.png', 836, 394, 84, 96, true],
  ['objects/pertemuan-1', 'obj_jam_dinding.png', 923, 395, 86, 92, true],
  ['objects/pertemuan-1', 'obj_jam_dinding_biru.png', 1013, 395, 86, 92, true],
  ['objects/pertemuan-1', 'obj_papan_tulis.png', 1104, 397, 86, 88, true],
  ['objects/pertemuan-1', 'obj_tas_belanja.png', 1204, 394, 74, 92, true],
  ['objects/pertemuan-1', 'obj_penggaris_segitiga.png', 1312, 397, 72, 90, true],
  ['objects/pertemuan-1', 'obj_tricky_triangle.png', 610, 536, 92, 88, true],

  // Meeting 2 objects
  ['objects/pertemuan-2', 'obj_pola_lantai_engklek.png', 800, 536, 76, 96, true],
  ['objects/pertemuan-2', 'obj_kano.png', 907, 565, 105, 48, true],
  ['objects/pertemuan-2', 'obj_rumah_geometri.png', 1010, 535, 92, 92, true],
  ['objects/pertemuan-2', 'obj_perahu_geometri.png', 1113, 535, 98, 92, true],
  ['objects/pertemuan-2', 'obj_robot_geometri.png', 1216, 535, 83, 96, true],
  ['objects/pertemuan-2', 'obj_kucing_geometri.png', 1305, 535, 90, 94, true],

  // Shapes
  ['shapes', 'shape_segitiga.png', 628, 661, 75, 62, true],
  ['shapes', 'shape_persegi.png', 723, 660, 74, 62, true],
  ['shapes', 'shape_persegi_panjang.png', 816, 671, 91, 40, true],
  ['shapes', 'shape_jajar_genjang.png', 934, 671, 80, 42, true],
  ['shapes', 'shape_belah_ketupat.png', 1038, 654, 74, 72, true],
  ['shapes', 'shape_layang_layang.png', 1137, 654, 73, 74, true],
  ['shapes', 'shape_trapesium.png', 1234, 666, 86, 49, true],
  ['shapes', 'shape_lingkaran.png', 1334, 648, 86, 83, true],
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function run(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `${command} failed`);
  }
  return result;
}

function parseBbox(log) {
  const matches = [...log.matchAll(/x1:(\d+) x2:(\d+) y1:(\d+) y2:(\d+) w:(\d+) h:(\d+)/g)];
  if (matches.length === 0) return null;
  const [, x1, x2, y1, y2, w, h] = matches[matches.length - 1].map(Number);
  return { x1, x2, y1, y2, width: w, height: h };
}

function getAlphaBbox(file) {
  const result = spawnSync(
    'ffmpeg',
    ['-hide_banner', '-i', file, '-vf', 'alphaextract,bbox', '-frames:v', '1', '-f', 'null', '-'],
    { encoding: 'utf8' }
  );
  return parseBbox(`${result.stdout}\n${result.stderr}`);
}

function cleanTransparent(crop, index) {
  const [folder, name, x, y, width, height] = crop;
  const tmp = path.join(tmpRoot, `${index}-${name}`);
  const out = path.join(outRoot, folder, name);
  ensureDir(path.dirname(tmp));
  ensureDir(path.dirname(out));

  run('ffmpeg', [
    '-y',
    '-hide_banner',
    '-loglevel',
    'error',
    '-i',
    source,
    '-vf',
    [
      `crop=${width}:${height}:${x}:${y}`,
      'colorkey=0x3d3d3d:0.085:0.025',
      'format=rgba',
    ].join(','),
    tmp,
  ]);

  const bbox = getAlphaBbox(tmp);
  if (!bbox || bbox.width <= 0 || bbox.height <= 0) {
    fs.copyFileSync(tmp, out);
    return { bbox: null };
  }

  const pad = 4;
  const trimX = Math.max(0, bbox.x1 - pad);
  const trimY = Math.max(0, bbox.y1 - pad);
  const trimW = Math.min(width - trimX, bbox.width + pad * 2);
  const trimH = Math.min(height - trimY, bbox.height + pad * 2);

  run('ffmpeg', [
    '-y',
    '-hide_banner',
    '-loglevel',
    'error',
    '-i',
    tmp,
    '-vf',
    `crop=${trimW}:${trimH}:${trimX}:${trimY},format=rgba`,
    out,
  ]);

  return { bbox, trimmed: { x: trimX, y: trimY, width: trimW, height: trimH } };
}

function copyBackground(crop) {
  const [folder, name, x, y, width, height] = crop;
  const out = path.join(outRoot, folder, name);
  ensureDir(path.dirname(out));
  run('ffmpeg', [
    '-y',
    '-hide_banner',
    '-loglevel',
    'error',
    '-i',
    source,
    '-vf',
    `crop=${width}:${height}:${x}:${y}`,
    out,
  ]);
}

function split(crop, index) {
  const [folder, name, x, y, width, height, transparent] = crop;
  let clean = {};
  if (transparent) clean = cleanTransparent(crop, index);
  else copyBackground(crop);

  return {
    folder,
    name,
    relativePath: `/gemini_clean_assets/${folder}/${name}`.replaceAll('\\', '/'),
    crop: { x, y, width, height },
    transparent,
    ...clean,
  };
}

function main() {
  if (!fs.existsSync(source)) throw new Error(`Missing source image: ${source}`);
  ensureDir(outRoot);
  ensureDir(tmpRoot);

  const assets = crops.map(split);
  const manifest = {
    generatedAt: new Date().toISOString(),
    generator: 'split_gemini_assets_clean.cjs',
    source: 'assets/Gemini_Generated_Image_ow1acuow1acuow1a.png',
    total: assets.length,
    assets,
  };

  fs.writeFileSync(path.join(outRoot, 'asset_manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Clean split ${assets.length} assets into ${outRoot}`);
}

main();

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const source = path.join(__dirname, 'assets', 'Gemini_Generated_Image_ow1acuow1acuow1a.png');
const outRoot = path.join(__dirname, 'public', 'gemini_split_assets');

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
  ['characters', 'char_anak_laki_laki.png', 944, 205, 82, 138, true],
  ['characters', 'char_anak_memegang_layang.png', 1027, 196, 116, 150, true],
  ['characters', 'char_anak_perempuan.png', 1146, 205, 91, 138, true],
  ['characters', 'char_kelompok_anak_bermain.png', 1235, 224, 164, 112, true],
  ['characters', 'char_guru_berdiri.png', 15, 395, 101, 172, true],
  ['characters', 'char_guru_menunjuk.png', 137, 395, 106, 172, true],
  ['characters', 'char_guru_berbicara.png', 273, 395, 115, 172, true],
  ['characters', 'char_anak_laki_laki_2.png', 414, 406, 91, 150, true],
  ['characters', 'char_anak_perempuan_2.png', 511, 402, 102, 150, true],
  ['characters', 'char_kelompok_anak_bermain_2.png', 11, 596, 248, 112, true],
  ['characters', 'char_anak_memegang_layang_2.png', 294, 599, 110, 116, true],
  ['characters', 'char_anak_berpikir.png', 414, 592, 102, 130, true],

  // Meeting 1 objects
  ['objects/pertemuan-1', 'obj_gantungan_baju.png', 623, 405, 94, 91, true],
  ['objects/pertemuan-1', 'obj_sandwich_segitiga.png', 725, 398, 100, 101, true],
  ['objects/pertemuan-1', 'obj_rambu_lalu_lintas.png', 835, 394, 86, 106, true],
  ['objects/pertemuan-1', 'obj_jam_dinding.png', 923, 395, 86, 101, true],
  ['objects/pertemuan-1', 'obj_jam_dinding_biru.png', 1013, 395, 86, 101, true],
  ['objects/pertemuan-1', 'obj_papan_tulis.png', 1104, 395, 86, 101, true],
  ['objects/pertemuan-1', 'obj_tas_belanja.png', 1203, 395, 75, 101, true],
  ['objects/pertemuan-1', 'obj_penggaris_segitiga.png', 1312, 397, 72, 99, true],
  ['objects/pertemuan-1', 'obj_tricky_triangle.png', 609, 535, 94, 99, true],

  // Meeting 2 objects
  ['objects/pertemuan-2', 'obj_pola_lantai_engklek.png', 799, 536, 77, 101, true],
  ['objects/pertemuan-2', 'obj_kano.png', 907, 566, 116, 55, true],
  ['objects/pertemuan-2', 'obj_rumah_geometri.png', 1010, 535, 92, 99, true],
  ['objects/pertemuan-2', 'obj_perahu_geometri.png', 1113, 535, 98, 99, true],
  ['objects/pertemuan-2', 'obj_robot_geometri.png', 1216, 535, 83, 101, true],
  ['objects/pertemuan-2', 'obj_kucing_geometri.png', 1305, 535, 90, 101, true],

  // Shapes
  ['shapes', 'shape_segitiga.png', 628, 661, 75, 66, true],
  ['shapes', 'shape_persegi.png', 723, 660, 74, 67, true],
  ['shapes', 'shape_persegi_panjang.png', 816, 671, 91, 44, true],
  ['shapes', 'shape_jajar_genjang.png', 934, 671, 88, 47, true],
  ['shapes', 'shape_belah_ketupat.png', 1038, 654, 74, 76, true],
  ['shapes', 'shape_layang_layang.png', 1137, 654, 73, 78, true],
  ['shapes', 'shape_trapesium.png', 1234, 666, 86, 53, true],
  ['shapes', 'shape_lingkaran.png', 1334, 648, 86, 87, true],
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function runFfmpeg(crop) {
  const [folder, name, x, y, w, h, transparent] = crop;
  const outPath = path.join(outRoot, folder, name);
  ensureDir(path.dirname(outPath));

  const filters = [`crop=${w}:${h}:${x}:${y}`];
  if (transparent) {
    // The sheet background is a flat dark gray. Keep threshold conservative
    // so dark outlines inside the assets remain intact.
    filters.push('colorkey=0x3d3d3d:0.055:0.025');
    filters.push('format=rgba');
  }

  const result = spawnSync(
    'ffmpeg',
    ['-y', '-hide_banner', '-loglevel', 'error', '-i', source, '-vf', filters.join(','), outPath],
    { encoding: 'utf8' }
  );

  if (result.status !== 0) {
    throw new Error(`${name}: ${result.stderr || result.stdout}`);
  }

  return {
    folder,
    name,
    relativePath: `/gemini_split_assets/${folder}/${name}`.replaceAll('\\', '/'),
    crop: { x, y, width: w, height: h },
    transparent,
  };
}

function main() {
  if (!fs.existsSync(source)) {
    throw new Error(`Source image not found: ${source}`);
  }

  ensureDir(outRoot);
  const assets = crops.map(runFfmpeg);
  const manifest = {
    generatedAt: new Date().toISOString(),
    generator: 'split_gemini_assets.cjs',
    source: 'assets/Gemini_Generated_Image_ow1acuow1acuow1a.png',
    total: assets.length,
    assets,
  };

  fs.writeFileSync(path.join(outRoot, 'asset_manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Split ${assets.length} assets into ${outRoot}`);
}

main();

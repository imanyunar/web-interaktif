const fs = require('fs');
const path = require('path');

const root = __dirname;
const outRoot = path.join(root, 'public', 'generated_assets_local');
const publicBackgrounds = path.join(root, 'public', 'backgrounds');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function copyBackground(sourceName, targetName) {
  const source = path.join(publicBackgrounds, sourceName);
  const target = path.join(outRoot, 'backgrounds', targetName);
  ensureDir(path.dirname(target));
  if (!fs.existsSync(source)) {
    throw new Error(`Missing source background: ${source}`);
  }
  fs.copyFileSync(source, target);
  return `/generated_assets_local/backgrounds/${targetName}`;
}

function svg(width, height, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000000" flood-opacity="0.18"/>
    </filter>
    <style>
      .stroke{stroke:#2d3748;stroke-width:8;stroke-linecap:round;stroke-linejoin:round}
      .thin{stroke:#2d3748;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
      .label{font-family:Arial, sans-serif;font-weight:800;fill:#2d3748}
    </style>
  </defs>
${body}
</svg>
`;
}

const assets = [];

function addSvg(folder, name, width, height, body, role) {
  const rel = `/generated_assets_local/${folder}/${name}`;
  write(path.join(outRoot, folder, name), svg(width, height, body));
  assets.push({ type: 'svg', role, path: rel });
}

function addBackground(sourceName, targetName, role) {
  const rel = copyBackground(sourceName, targetName);
  assets.push({ type: 'png', role, path: rel, source: `/backgrounds/${sourceName}` });
}

function shapeBody(kind, fill, stroke = '#2d3748') {
  const common = `fill="${fill}" stroke="${stroke}" stroke-width="10" stroke-linejoin="round" filter="url(#shadow)"`;
  const label = {
    triangle: 'Segitiga',
    square: 'Persegi',
    rectangle: 'Persegi Panjang',
    circle: 'Lingkaran',
    parallelogram: 'Jajar Genjang',
    rhombus: 'Belah Ketupat',
    kite: 'Layang-layang',
    trapezoid: 'Trapesium',
  }[kind];

  const map = {
    triangle: `<polygon points="256,70 442,430 70,430" ${common}/>` ,
    square: `<rect x="96" y="96" width="320" height="320" rx="18" ${common}/>` ,
    rectangle: `<rect x="70" y="145" width="372" height="220" rx="18" ${common}/>` ,
    circle: `<circle cx="256" cy="256" r="170" ${common}/>` ,
    parallelogram: `<polygon points="140,120 438,120 372,392 74,392" ${common}/>` ,
    rhombus: `<polygon points="256,62 450,256 256,450 62,256" ${common}/>` ,
    kite: `<polygon points="256,56 420,222 256,462 92,222" ${common}/>` ,
    trapezoid: `<polygon points="142,118 370,118 446,400 66,400" ${common}/>` ,
  };

  return `
  <rect width="512" height="512" fill="none"/>
  ${map[kind]}
  <text x="256" y="492" text-anchor="middle" font-size="34" class="label">${label}</text>`;
}

function generateBackgrounds() {
  addBackground('scene_01.png', 'bg_beranda_taman.png', 'Beranda taman dari video');
  addBackground('scene_02.png', 'bg_petunjuk_penggunaan.png', 'Petunjuk penggunaan dari video');
  addBackground('scene_03.png', 'bg_tujuan_pembelajaran.png', 'Tujuan pembelajaran dari video');
  addBackground('scene_04.png', 'bg_menu.png', 'Menu pertemuan dari video');
  addBackground('scene_05.png', 'bg_pertemuan1_pembuka.png', 'Pembuka pertemuan 1');
  addBackground('scene_06.png', 'bg_kelompok_pertemuan1.png', 'Kelompok pertemuan 1');
  addBackground('scene_21.png', 'bg_eksplorasi_segitiga.png', 'Eksplorasi segitiga');
  addBackground('scene_36.png', 'bg_eksplorasi_segiempat.png', 'Eksplorasi segiempat');
  addBackground('scene_64.png', 'bg_eksplorasi_campuran.png', 'Eksplorasi bangun datar campuran');
  addBackground('scene_100.png', 'bg_pertemuan2_pembuka.png', 'Pembuka pertemuan 2');
  addBackground('scene_111.png', 'bg_penutup.png', 'Penutup');
}

function generateShapes() {
  addSvg('shapes', 'shape_segitiga.svg', 512, 512, shapeBody('triangle', '#ef4444'), 'Bangun datar segitiga');
  addSvg('shapes', 'shape_persegi.svg', 512, 512, shapeBody('square', '#22c55e'), 'Bangun datar persegi');
  addSvg('shapes', 'shape_persegi_panjang.svg', 512, 512, shapeBody('rectangle', '#3b82f6'), 'Bangun datar persegi panjang');
  addSvg('shapes', 'shape_lingkaran.svg', 512, 512, shapeBody('circle', '#fde047'), 'Bangun datar lingkaran');
  addSvg('shapes', 'shape_jajar_genjang.svg', 512, 512, shapeBody('parallelogram', '#fb923c'), 'Bangun datar jajar genjang');
  addSvg('shapes', 'shape_belah_ketupat.svg', 512, 512, shapeBody('rhombus', '#a855f7'), 'Bangun datar belah ketupat');
  addSvg('shapes', 'shape_layang_layang.svg', 512, 512, shapeBody('kite', '#ec4899'), 'Bangun datar layang-layang');
  addSvg('shapes', 'shape_trapesium.svg', 512, 512, shapeBody('trapezoid', '#a16207'), 'Bangun datar trapesium');
}

function generateCharacters() {
  const teacherBase = (pose) => `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <ellipse cx="256" cy="468" rx="120" ry="24" fill="#000" opacity=".12"/>
    <path d="M170 208 Q256 72 342 208 L330 354 Q256 410 182 354 Z" fill="#b58155" class="thin"/>
    <circle cx="256" cy="204" r="66" fill="#ffd7b5" class="thin"/>
    <path d="M190 216 Q256 116 322 216 Q306 142 256 126 Q206 142 190 216Z" fill="#8b5e3c"/>
    <circle cx="232" cy="202" r="7" fill="#1f2937"/><circle cx="280" cy="202" r="7" fill="#1f2937"/>
    <path d="M235 238 Q256 254 280 238" fill="none" class="thin"/>
    <path d="M206 292 L306 292 L348 444 L164 444Z" fill="#d7a86e" class="thin"/>
    ${pose === 'pointing' ? '<path d="M324 310 C384 292 420 260 454 224" fill="none" class="stroke"/><circle cx="462" cy="218" r="12" fill="#ffd7b5" class="thin"/>' : '<path d="M324 314 C364 344 386 380 396 420" fill="none" class="stroke"/>'}
    ${pose === 'speaking' ? '<path d="M188 318 C142 294 116 254 104 220" fill="none" class="stroke"/><circle cx="100" cy="212" r="12" fill="#ffd7b5" class="thin"/>' : '<path d="M188 314 C150 344 128 380 118 420" fill="none" class="stroke"/>'}
  </g>`;

  addSvg('characters', 'char_guru_berdiri.svg', 512, 512, teacherBase('standing'), 'Guru berdiri');
  addSvg('characters', 'char_guru_menunjuk.svg', 512, 512, teacherBase('pointing'), 'Guru menunjuk');
  addSvg('characters', 'char_guru_berbicara.svg', 512, 512, teacherBase('speaking'), 'Guru berbicara');

  const child = (shirt, skirt = false, kite = false) => `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <ellipse cx="256" cy="468" rx="98" ry="22" fill="#000" opacity=".12"/>
    <circle cx="256" cy="132" r="58" fill="#ffd7b5" class="thin"/>
    <path d="M198 120 Q256 52 314 120 Q292 86 256 86 Q220 86 198 120Z" fill="#2f3a4a"/>
    <circle cx="235" cy="132" r="6" fill="#1f2937"/><circle cx="277" cy="132" r="6" fill="#1f2937"/>
    <path d="M235 162 Q256 180 278 162" fill="none" class="thin"/>
    <path d="M204 206 L308 206 L334 344 L178 344Z" fill="${shirt}" class="thin"/>
    ${skirt ? '<path d="M190 344 L322 344 L350 418 L162 418Z" fill="#f472b6" class="thin"/>' : '<path d="M214 344 L248 344 L240 438 L198 438Z" fill="#2563eb" class="thin"/><path d="M264 344 L298 344 L314 438 L272 438Z" fill="#2563eb" class="thin"/>'}
    <path d="M202 230 C158 252 132 284 114 326" fill="none" class="stroke"/>
    <path d="M310 230 C360 252 392 286 410 326" fill="none" class="stroke"/>
    ${kite ? '<line x1="410" y1="326" x2="452" y2="152" class="thin"/><polygon points="452,72 500,136 452,200 404,136" fill="#facc15" class="thin"/><path d="M452 200 C430 236 476 254 452 292" fill="none" stroke="#ec4899" stroke-width="5"/>' : ''}
  </g>`;

  addSvg('characters', 'char_anak_laki_laki.svg', 512, 512, child('#38bdf8'), 'Anak laki-laki');
  addSvg('characters', 'char_anak_perempuan.svg', 512, 512, child('#f97316', true), 'Anak perempuan');
  addSvg('characters', 'char_anak_layang.svg', 512, 512, child('#22c55e', false, true), 'Anak membawa layang-layang');
}

function generateObjectsMeeting1() {
  addSvg('objects/pertemuan-1', 'obj_gantungan_baju.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)" fill="none" class="stroke">
    <path d="M256 126 C256 82 314 84 300 130 C292 154 266 154 266 188"/>
    <path d="M92 402 L256 190 L420 402 Z"/>
    <path d="M92 402 H420"/>
  </g>`, 'Objek gantungan baju segitiga');

  addSvg('objects/pertemuan-1', 'obj_sandwich_segitiga.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <polygon points="86,410 256,92 426,410" fill="#f5d199" class="stroke"/>
    <polygon points="112,392 256,128 400,392" fill="#fef3c7" class="thin"/>
    <path d="M142 346 H370" stroke="#22c55e" stroke-width="18" stroke-linecap="round"/>
    <path d="M166 304 H346" stroke="#ef4444" stroke-width="16" stroke-linecap="round"/>
  </g>`, 'Objek sandwich segitiga');

  addSvg('objects/pertemuan-1', 'obj_tricky_triangle.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <polygon points="256,70 446,420 66,420" fill="#b7791f" class="stroke"/>
    ${Array.from({ length: 15 }, (_, i) => {
      const row = Math.floor((Math.sqrt(8 * i + 1) - 1) / 2);
      const indexInRow = i - (row * (row + 1)) / 2;
      const y = 148 + row * 64;
      const x = 256 - row * 34 + indexInRow * 68;
      return `<circle cx="${x}" cy="${y}" r="18" fill="#fbbf24" class="thin"/>`;
    }).join('')}
  </g>`, 'Permainan tricky triangle');

  addSvg('objects/pertemuan-1', 'obj_rambu_lalu_lintas.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <polygon points="256,56 456,256 256,456 56,256" fill="#fde047" class="stroke"/>
    <rect x="214" y="132" width="84" height="246" rx="38" fill="#1f2937" class="thin"/>
    <circle cx="256" cy="184" r="24" fill="#ef4444"/>
    <circle cx="256" cy="256" r="24" fill="#facc15"/>
    <circle cx="256" cy="328" r="24" fill="#22c55e"/>
  </g>`, 'Rambu lalu lintas belah ketupat');

  addSvg('objects/pertemuan-1', 'obj_jam_dinding.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <rect x="96" y="96" width="320" height="320" rx="20" fill="#f8fafc" class="stroke"/>
    <circle cx="256" cy="256" r="116" fill="#fff" class="thin"/>
    <line x1="256" y1="256" x2="256" y2="178" class="thin"/>
    <line x1="256" y1="256" x2="326" y2="292" class="thin"/>
    <circle cx="256" cy="256" r="8" fill="#1f2937"/>
  </g>`, 'Jam dinding persegi');

  addSvg('objects/pertemuan-1', 'obj_papan_tulis.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <rect x="70" y="140" width="372" height="230" rx="12" fill="#166534" class="stroke"/>
    <rect x="60" y="364" width="392" height="24" rx="8" fill="#92400e"/>
    <line x1="120" y1="190" x2="390" y2="190" stroke="#bbf7d0" stroke-width="6" opacity=".8"/>
  </g>`, 'Papan tulis persegi panjang');

  addSvg('objects/pertemuan-1', 'obj_tas_belanja.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <path d="M152 180 H360 L414 426 H98 Z" fill="#ef4444" class="stroke"/>
    <path d="M196 180 C196 104 316 104 316 180" fill="none" class="stroke"/>
  </g>`, 'Tas belanja trapesium');

  addSvg('objects/pertemuan-1', 'obj_penggaris_segitiga.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <polygon points="90,420 256,96 422,420" fill="#93c5fd" fill-opacity=".75" class="stroke"/>
    <polygon points="190,360 256,230 322,360" fill="#ffffff" fill-opacity=".85" class="thin"/>
    <line x1="132" y1="396" x2="380" y2="396" stroke="#2563eb" stroke-width="8"/>
  </g>`, 'Penggaris segitiga');
}

function generateObjectsMeeting2() {
  addSvg('objects/pertemuan-2', 'obj_rumah_geometri.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <polygon points="256,76 432,220 80,220" fill="#ef4444" class="stroke"/>
    <rect x="126" y="220" width="260" height="214" fill="#22c55e" class="stroke"/>
    <rect x="226" y="304" width="64" height="130" fill="#3b82f6" class="thin"/>
  </g>`, 'Rumah geometri utuh');

  addSvg('objects/pertemuan-2', 'obj_perahu_geometri.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <line x1="256" y1="88" x2="256" y2="342" class="stroke"/>
    <polygon points="260,94 394,286 260,286" fill="#fef3c7" class="stroke"/>
    <polygon points="252,134 118,286 252,286" fill="#bfdbfe" class="stroke"/>
    <polygon points="86,342 426,342 352,420 160,420" fill="#a16207" class="stroke"/>
  </g>`, 'Perahu geometri utuh');

  addSvg('objects/pertemuan-2', 'obj_robot_geometri.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)">
    <rect x="176" y="70" width="160" height="120" rx="12" fill="#22c55e" class="stroke"/>
    <circle cx="222" cy="128" r="12" fill="#1f2937"/><circle cx="290" cy="128" r="12" fill="#1f2937"/>
    <rect x="148" y="214" width="216" height="174" rx="14" fill="#3b82f6" class="stroke"/>
    <rect x="82" y="232" width="54" height="138" rx="10" fill="#fb923c" class="stroke"/>
    <rect x="376" y="232" width="54" height="138" rx="10" fill="#fb923c" class="stroke"/>
  </g>`, 'Robot geometri utuh');

  addSvg('objects/pertemuan-2', 'obj_pola_lantai_engklek.svg', 512, 512, `
  <rect width="512" height="512" fill="none"/>
  <g filter="url(#shadow)" fill="#fef3c7" class="stroke">
    <rect x="206" y="368" width="100" height="100" rx="8"/>
    <rect x="206" y="260" width="100" height="100" rx="8"/>
    <rect x="98" y="152" width="100" height="100" rx="8"/>
    <rect x="314" y="152" width="100" height="100" rx="8"/>
    <rect x="206" y="44" width="100" height="100" rx="8"/>
  </g>`, 'Pola lantai engklek');
}

function generateParts() {
  addSvg('objects/parts', 'part_rumah_atap_segitiga.svg', 512, 512, shapeBody('triangle', '#ef4444'), 'Bagian rumah: atap segitiga');
  addSvg('objects/parts', 'part_rumah_dinding_persegi.svg', 512, 512, shapeBody('square', '#22c55e'), 'Bagian rumah: dinding persegi');
  addSvg('objects/parts', 'part_rumah_pintu_persegi_panjang.svg', 512, 512, shapeBody('rectangle', '#3b82f6'), 'Bagian rumah: pintu persegi panjang');
  addSvg('objects/parts', 'part_perahu_badan_trapesium.svg', 512, 512, shapeBody('trapezoid', '#a16207'), 'Bagian perahu: badan trapesium');
  addSvg('objects/parts', 'part_perahu_layar_segitiga.svg', 512, 512, shapeBody('triangle', '#bfdbfe'), 'Bagian perahu: layar segitiga');
  addSvg('objects/parts', 'part_robot_kepala_persegi.svg', 512, 512, shapeBody('square', '#22c55e'), 'Bagian robot: kepala persegi');
  addSvg('objects/parts', 'part_robot_badan_persegi_panjang.svg', 512, 512, shapeBody('rectangle', '#3b82f6'), 'Bagian robot: badan persegi panjang');
  addSvg('objects/parts', 'part_kucing_badan_lingkaran.svg', 512, 512, shapeBody('circle', '#a855f7'), 'Bagian kucing: badan lingkaran');
  addSvg('objects/parts', 'part_kucing_telinga_segitiga.svg', 512, 512, shapeBody('triangle', '#ec4899'), 'Bagian kucing: telinga segitiga');
}

function generateUi() {
  const button = (text, color, icon) => `
  <rect width="520" height="160" rx="80" fill="${color}" filter="url(#shadow)"/>
  <rect x="10" y="10" width="500" height="140" rx="70" fill="none" stroke="#fff" stroke-width="10" opacity=".35"/>
  <text x="260" y="100" text-anchor="middle" font-size="48" font-family="Arial, sans-serif" font-weight="900" fill="#fff">${icon} ${text}</text>`;

  addSvg('ui', 'btn_start.svg', 520, 160, button('START', '#22c55e', ''), 'Tombol start');
  addSvg('ui', 'btn_kembali.svg', 520, 160, button('KEMBALI', '#004aad', '&#8592;'), 'Tombol kembali');
  addSvg('ui', 'btn_home_menu.svg', 620, 160, `
  <rect width="620" height="160" rx="80" fill="#ff8c00" filter="url(#shadow)"/>
  <rect x="10" y="10" width="600" height="140" rx="70" fill="none" stroke="#fff" stroke-width="10" opacity=".35"/>
  <text x="310" y="100" text-anchor="middle" font-size="44" font-family="Arial, sans-serif" font-weight="900" fill="#fff">&#8962; HOME / MENU</text>`, 'Tombol home menu');
  addSvg('ui', 'btn_selanjutnya.svg', 620, 160, `
  <rect width="620" height="160" rx="80" fill="#32cd32" filter="url(#shadow)"/>
  <rect x="10" y="10" width="600" height="140" rx="70" fill="none" stroke="#fff" stroke-width="10" opacity=".35"/>
  <text x="310" y="100" text-anchor="middle" font-size="44" font-family="Arial, sans-serif" font-weight="900" fill="#fff">SELANJUTNYA &#8594;</text>`, 'Tombol selanjutnya');
}

function main() {
  ensureDir(outRoot);
  generateBackgrounds();
  generateShapes();
  generateCharacters();
  generateObjectsMeeting1();
  generateObjectsMeeting2();
  generateParts();
  generateUi();

  const manifest = {
    generatedAt: new Date().toISOString(),
    generator: 'generate_local_learning_assets.cjs',
    note: 'Background PNG files are copied from extracted video frames. SVG files are local deterministic assets with transparent backgrounds.',
    total: assets.length,
    assets,
  };

  write(path.join(outRoot, 'asset_manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Generated ${assets.length} local learning assets in ${outRoot}`);
}

main();

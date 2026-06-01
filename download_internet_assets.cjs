const fs = require('fs');
const path = require('path');

const outRoot = path.join(__dirname, 'public', 'internet_assets');

const sources = {
  openmoji: {
    provider: 'OpenMoji via Iconify API',
    license: 'CC BY-SA 4.0',
    homepage: 'https://openmoji.org/',
  },
  openclipart: {
    provider: 'OpenClipart',
    license: 'Public domain / CC0-style OpenClipart collection',
    homepage: 'https://openclipart.org/',
  },
};

function iconify(name) {
  return `https://api.iconify.design/openmoji:${name}.svg`;
}

function openclipart(id, slug) {
  return `https://openclipart.org/download/${id}/${slug}.svg`;
}

const assets = [
  // Background / large scene references
  {
    folder: 'backgrounds',
    name: 'bg_classroom_openclipart.svg',
    url: openclipart('297309', 'classroom'),
    source: 'openclipart',
    role: 'Classroom background',
    page: 'https://openclipart.org/detail/297309/classroom',
  },
  {
    folder: 'backgrounds',
    name: 'bg_classroom_silhouette_openclipart.svg',
    url: openclipart('221799', 'classroom-silhouette'),
    source: 'openclipart',
    role: 'Classroom silhouette background',
    page: 'https://openclipart.org/detail/221799/classroom-silhouette',
  },
  {
    folder: 'backgrounds',
    name: 'bg_park_openclipart.svg',
    url: openclipart('3995', 'park'),
    source: 'openclipart',
    role: 'Park / outdoor background base',
    page: 'https://openclipart.org/detail/3995/park',
  },
  {
    folder: 'backgrounds',
    name: 'bg_blackboard_openclipart.svg',
    url: openclipart('49363', 'blackboard'),
    source: 'openclipart',
    role: 'Blackboard scene element',
    page: 'https://openclipart.org/detail/49363/blackboard',
  },

  // Characters
  {
    folder: 'characters',
    name: 'char_teacher.svg',
    url: iconify('teacher'),
    source: 'openmoji',
    role: 'Teacher character icon',
  },
  {
    folder: 'characters',
    name: 'char_woman_teacher.svg',
    url: iconify('woman-teacher'),
    source: 'openmoji',
    role: 'Female teacher character icon',
  },
  {
    folder: 'characters',
    name: 'char_child.svg',
    url: iconify('child'),
    source: 'openmoji',
    role: 'Child character icon',
  },
  {
    folder: 'characters',
    name: 'char_boy.svg',
    url: iconify('boy'),
    source: 'openmoji',
    role: 'Boy character icon',
  },
  {
    folder: 'characters',
    name: 'char_girl.svg',
    url: iconify('girl'),
    source: 'openmoji',
    role: 'Girl character icon',
  },
  {
    folder: 'characters',
    name: 'char_child_with_kite_openclipart.svg',
    url: openclipart('67597', 'child-with-a-kite'),
    source: 'openclipart',
    role: 'Child playing with kite',
    page: 'https://openclipart.org/detail/67597/child-with-a-kite',
  },
  {
    folder: 'characters',
    name: 'char_playing_kite_openclipart.svg',
    url: openclipart('283419', 'playing-kite'),
    source: 'openclipart',
    role: 'Playing kite illustration',
    page: 'https://openclipart.org/detail/283419/playing-kite',
  },

  // Meeting 1 objects
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_sandwich.svg',
    url: iconify('sandwich'),
    source: 'openmoji',
    role: 'Sandwich object',
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_penggaris_segitiga.svg',
    url: iconify('triangular-ruler'),
    source: 'openmoji',
    role: 'Triangular ruler object',
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_jam_dinding.svg',
    url: iconify('mantelpiece-clock'),
    source: 'openmoji',
    role: 'Clock object',
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_papan_tulis_openclipart.svg',
    url: openclipart('49363', 'blackboard'),
    source: 'openclipart',
    role: 'Blackboard object',
    page: 'https://openclipart.org/detail/49363/blackboard',
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_rambu_lalu_lintas.svg',
    url: iconify('horizontal-traffic-light'),
    source: 'openmoji',
    role: 'Traffic light object',
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_rambu_anak_menyebrang.svg',
    url: iconify('children-crossing'),
    source: 'openmoji',
    role: 'Traffic sign object',
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_tas_belanja.svg',
    url: iconify('shopping-bags'),
    source: 'openmoji',
    role: 'Shopping bag object',
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_belah_ketupat_kuning.svg',
    url: iconify('large-orange-diamond'),
    source: 'openmoji',
    role: 'Diamond shape object',
  },

  // Meeting 2 objects
  {
    folder: 'objects/pertemuan-2',
    name: 'obj_rumah.svg',
    url: iconify('house'),
    source: 'openmoji',
    role: 'House composition object',
  },
  {
    folder: 'objects/pertemuan-2',
    name: 'obj_perahu.svg',
    url: iconify('sailboat'),
    source: 'openmoji',
    role: 'Boat composition object',
  },
  {
    folder: 'objects/pertemuan-2',
    name: 'obj_layang_layang.svg',
    url: iconify('kite'),
    source: 'openmoji',
    role: 'Kite object',
  },
  {
    folder: 'objects/pertemuan-2',
    name: 'obj_sekolah.svg',
    url: iconify('school'),
    source: 'openmoji',
    role: 'School building object',
  },

  // Shape pieces
  {
    folder: 'shapes',
    name: 'shape_segitiga.svg',
    url: iconify('red-triangle-pointed-up'),
    source: 'openmoji',
    role: 'Triangle shape',
  },
  {
    folder: 'shapes',
    name: 'shape_persegi.svg',
    url: iconify('green-square'),
    source: 'openmoji',
    role: 'Square shape',
  },
  {
    folder: 'shapes',
    name: 'shape_persegi_panjang.svg',
    url: iconify('blue-square'),
    source: 'openmoji',
    role: 'Square / rectangle base shape',
  },
  {
    folder: 'shapes',
    name: 'shape_belah_ketupat.svg',
    url: iconify('large-orange-diamond'),
    source: 'openmoji',
    role: 'Rhombus / diamond shape',
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function filePath(asset) {
  return path.join(outRoot, asset.folder, asset.name);
}

async function download(asset) {
  const dest = filePath(asset);
  ensureDir(path.dirname(dest));

  const response = await fetch(asset.url);
  if (!response.ok) {
    throw new Error(`${asset.name}: HTTP ${response.status}`);
  }

  const content = await response.text();
  if (!content.includes('<svg')) {
    throw new Error(`${asset.name}: response is not SVG`);
  }

  fs.writeFileSync(dest, content);
  return {
    ...asset,
    relativePath: `/internet_assets/${asset.folder}/${asset.name}`.replaceAll('\\', '/'),
    bytes: Buffer.byteLength(content),
    provider: sources[asset.source].provider,
    license: sources[asset.source].license,
    homepage: sources[asset.source].homepage,
  };
}

async function main() {
  ensureDir(outRoot);
  const results = [];
  const failed = [];

  for (const asset of assets) {
    try {
      const result = await download(asset);
      results.push(result);
      console.log(`Saved ${result.relativePath} (${result.bytes} bytes)`);
    } catch (error) {
      failed.push({ ...asset, error: error.message });
      console.error(`Failed ${asset.folder}/${asset.name}: ${error.message}`);
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    generator: 'download_internet_assets.cjs',
    note: 'Downloaded from internet sources with license/provider metadata. Keep attribution when publishing.',
    total: results.length,
    failed: failed.length,
    sources,
    assets: results,
    failedAssets: failed,
  };

  fs.writeFileSync(path.join(outRoot, 'asset_manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Done. ${results.length}/${assets.length} internet assets saved to ${outRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

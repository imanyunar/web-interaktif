const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const sourceDir = path.join(__dirname, 'assets', 'new aset');
const outRoot = path.join(__dirname, 'public', 'new_assets');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function normalizeName(name) {
  return name.replace(/\.png\.png$/i, '.png');
}

function classify(name) {
  if (name.startsWith('bg_')) return 'backgrounds';
  if (name.startsWith('char_')) return 'characters';
  if (name.startsWith('shape_')) return 'shapes';
  if (name.startsWith('part_')) return 'parts';
  if (name.startsWith('obj_')) {
    const meeting2 = [
      'obj_kano.png',
      'obj_kucing_geometri.png',
      'obj_perahu_geometri.png',
      'obj_pola_lantai_engklek.png',
      'obj_robot_geometri.png',
      'obj_rumah_geometri.png',
    ];
    return meeting2.includes(name) ? 'objects/pertemuan-2' : 'objects/pertemuan-1';
  }
  return 'misc';
}

function probe(filePath) {
  const result = spawnSync(
    'ffprobe',
    [
      '-v',
      'error',
      '-select_streams',
      'v:0',
      '-show_entries',
      'stream=width,height,pix_fmt',
      '-of',
      'csv=p=0',
      filePath,
    ],
    { encoding: 'utf8' }
  );

  if (result.status !== 0) return {};
  const [width, height, pixFmt] = result.stdout.trim().split(',');
  return {
    width: Number(width),
    height: Number(height),
    pixFmt,
    transparent: String(pixFmt || '').includes('rgba') || String(pixFmt || '').includes('yuva'),
  };
}

function main() {
  ensureDir(outRoot);
  const assets = [];
  const files = fs.readdirSync(sourceDir).filter((name) => name.toLowerCase().endsWith('.png'));

  for (const originalName of files) {
    const normalizedName = normalizeName(originalName);
    const folder = classify(normalizedName);
    const source = path.join(sourceDir, originalName);
    const target = path.join(outRoot, folder, normalizedName);
    ensureDir(path.dirname(target));
    fs.copyFileSync(source, target);

    const meta = probe(target);
    assets.push({
      originalName,
      name: normalizedName,
      folder,
      relativePath: `/new_assets/${folder}/${normalizedName}`.replaceAll('\\', '/'),
      bytes: fs.statSync(target).size,
      ...meta,
    });
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    generator: 'prepare_new_assets.cjs',
    source: 'assets/new aset',
    total: assets.length,
    assets,
  };

  fs.writeFileSync(path.join(outRoot, 'asset_manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Prepared ${assets.length} assets in ${outRoot}`);
}

main();

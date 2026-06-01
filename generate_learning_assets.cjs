const fs = require('fs');
const path = require('path');

const outputRoot = path.join(__dirname, 'public', 'generated_assets');

const baseStyle = [
  'bright cheerful Indonesian elementary school educational media',
  '2D cartoon illustration',
  'clean rounded shapes',
  'consistent playful classroom learning style',
  'no watermark',
  'no logo',
].join(', ');

const assets = [
  // Backgrounds
  {
    folder: 'backgrounds',
    name: 'bg_beranda_taman.png',
    size: [1920, 1080],
    prompt: `${baseStyle}, wide park schoolyard background, blue sky, fluffy clouds, green grass, white fence, trees at the sides, empty center space for title and START button, 16:9`,
  },
  {
    folder: 'backgrounds',
    name: 'bg_petunjuk_langit.png',
    size: [1920, 1080],
    prompt: `${baseStyle}, soft sky blue watercolor background, clouds, sun in the corner, empty center area for instruction panel, 16:9`,
  },
  {
    folder: 'backgrounds',
    name: 'bg_tujuan_pembelajaran.png',
    size: [1920, 1080],
    prompt: `${baseStyle}, warm learning slide background, pastel classroom wall, target icon area, child illustration space on right, empty area for learning objectives text, 16:9`,
  },
  {
    folder: 'backgrounds',
    name: 'bg_menu_taman.png',
    size: [1920, 1080],
    prompt: `${baseStyle}, school park menu background, trees, grass, cheerful children silhouettes far away, large empty middle area for two menu cards, 16:9`,
  },
  {
    folder: 'backgrounds',
    name: 'bg_pertemuan1_lapangan.png',
    size: [1920, 1080],
    prompt: `${baseStyle}, outdoor schoolyard with children playing traditional games, bright green field, empty top area for title banner, 16:9`,
  },
  {
    folder: 'backgrounds',
    name: 'bg_eksplorasi_rumput.png',
    size: [1920, 1080],
    prompt: `${baseStyle}, simple exploration background, pale blue sky with small sun and clouds, green grass strip along bottom, large empty center for geometry object and labels, 16:9`,
  },
  {
    folder: 'backgrounds',
    name: 'bg_kelas.png',
    size: [1920, 1080],
    prompt: `${baseStyle}, warm classroom background, chalkboard, bookshelf, teacher desk, pastel wall, empty center-right area for objects and speech bubbles, 16:9`,
  },
  {
    folder: 'backgrounds',
    name: 'bg_pertemuan2_luar_ruang.png',
    size: [1920, 1080],
    prompt: `${baseStyle}, outdoor learning background near school, children collaborating around geometric objects, green field, sky, empty center for composition activity, 16:9`,
  },
  {
    folder: 'backgrounds',
    name: 'bg_penutup.png',
    size: [1920, 1080],
    prompt: `${baseStyle}, friendly closing classroom and garden blend background, warm light, empty center for thank you message, 16:9`,
  },

  // Characters
  {
    folder: 'characters',
    name: 'char_guru_berdiri.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, full body cute female teacher wearing brown hijab and modest beige brown outfit, standing and smiling, isolated on plain white background, generous padding`,
  },
  {
    folder: 'characters',
    name: 'char_guru_menunjuk.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, full body cute female teacher wearing brown hijab, pointing to the side while explaining, smiling, isolated on plain white background, generous padding`,
  },
  {
    folder: 'characters',
    name: 'char_guru_berbicara.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, cute female teacher wearing brown hijab, speaking with one hand raised, friendly expression, isolated on plain white background, generous padding`,
  },
  {
    folder: 'characters',
    name: 'char_anak_laki_laki.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, cute Indonesian elementary school boy, full body, smiling, school casual outfit, isolated on plain white background, generous padding`,
  },
  {
    folder: 'characters',
    name: 'char_anak_perempuan.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, cute Indonesian elementary school girl, full body, smiling, school casual outfit, isolated on plain white background, generous padding`,
  },
  {
    folder: 'characters',
    name: 'char_kelompok_anak_bermain.png',
    size: [1536, 1024],
    prompt: `${baseStyle}, group of Indonesian elementary school children playing together happily in a schoolyard, isolated on plain white background, generous padding`,
  },
  {
    folder: 'characters',
    name: 'char_anak_layang.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, cute school boy running while holding a colorful kite, joyful expression, isolated on plain white background, generous padding`,
  },

  // Meeting 1 real-world objects
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_gantungan_baju.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, wooden clothes hanger shaped like a triangle, front view, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_sandwich_segitiga.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, triangular sandwich slice with bread and filling, front view, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_tricky_triangle.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, traditional triangle puzzle game board with small round pieces, front view, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_rambu_lalu_lintas.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, yellow diamond traffic sign with traffic light symbol, front view, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_jam_dinding.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, square wall clock with simple black hands, front view, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_papan_tulis.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, rectangular green classroom chalkboard with wooden frame, front view, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_tas_belanja.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, red trapezoid shopping bag with handles, front view, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-1',
    name: 'obj_penggaris_segitiga.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, blue transparent triangular ruler for school geometry, front view, isolated object on plain white background`,
  },

  // Meeting 2 composition objects
  {
    folder: 'objects/pertemuan-2',
    name: 'obj_pola_lantai_engklek.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, hopscotch floor pattern made from connected squares and rectangles, top view, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-2',
    name: 'obj_kano_geometri.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, simple canoe boat made from geometric shapes, triangle sail and trapezoid hull, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-2',
    name: 'obj_rumah_geometri.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, simple house made from geometric shapes, triangle roof, square wall, rectangle door, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-2',
    name: 'obj_perahu_geometri.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, simple sailboat made from geometric shapes, triangle sail and trapezoid hull, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-2',
    name: 'obj_robot_geometri.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, friendly robot made from squares and rectangles, isolated object on plain white background`,
  },
  {
    folder: 'objects/pertemuan-2',
    name: 'obj_kucing_geometri.png',
    size: [1024, 1024],
    prompt: `${baseStyle}, cute cat made from circles and triangles, isolated object on plain white background`,
  },

  // Decomposition parts
  {
    folder: 'objects/parts',
    name: 'part_rumah_atap_segitiga.png',
    size: [768, 768],
    prompt: `${baseStyle}, single red triangular house roof piece, isolated on plain white background`,
  },
  {
    folder: 'objects/parts',
    name: 'part_rumah_dinding_persegi.png',
    size: [768, 768],
    prompt: `${baseStyle}, single green square house wall piece, isolated on plain white background`,
  },
  {
    folder: 'objects/parts',
    name: 'part_rumah_pintu_persegi_panjang.png',
    size: [768, 768],
    prompt: `${baseStyle}, single blue rectangular house door piece, isolated on plain white background`,
  },
  {
    folder: 'objects/parts',
    name: 'part_perahu_badan_trapesium.png',
    size: [768, 768],
    prompt: `${baseStyle}, single brown trapezoid boat hull piece, isolated on plain white background`,
  },
  {
    folder: 'objects/parts',
    name: 'part_perahu_layar_segitiga.png',
    size: [768, 768],
    prompt: `${baseStyle}, single white triangular sail piece with blue outline, isolated on plain white background`,
  },
  {
    folder: 'objects/parts',
    name: 'part_robot_kepala_persegi.png',
    size: [768, 768],
    prompt: `${baseStyle}, single square robot head piece, green, isolated on plain white background`,
  },
  {
    folder: 'objects/parts',
    name: 'part_robot_badan_persegi_panjang.png',
    size: [768, 768],
    prompt: `${baseStyle}, single blue rectangular robot body piece, isolated on plain white background`,
  },
  {
    folder: 'objects/parts',
    name: 'part_kucing_badan_lingkaran.png',
    size: [768, 768],
    prompt: `${baseStyle}, single purple circle cat body piece, isolated on plain white background`,
  },
  {
    folder: 'objects/parts',
    name: 'part_kucing_telinga_segitiga.png',
    size: [768, 768],
    prompt: `${baseStyle}, pair of small purple triangle cat ear pieces, isolated on plain white background`,
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function assetPath(asset) {
  return path.join(outputRoot, asset.folder, asset.name);
}

function buildUrl(asset) {
  const [width, height] = asset.size;
  const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    nologo: 'true',
    enhance: 'true',
    model: 'flux',
  });
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(asset.prompt)}?${params.toString()}`;
}

async function downloadImage(asset, retryCount = 2) {
  const dest = assetPath(asset);
  ensureDir(path.dirname(dest));

  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log(`Skipping ${asset.folder}/${asset.name}`);
    return { ...asset, path: dest, skipped: true };
  }

  const url = buildUrl(asset);

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      console.log(`Generating ${asset.folder}/${asset.name} (${attempt + 1}/${retryCount + 1})`);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${asset.folder}/${asset.name} (${buffer.length} bytes)`);
      return { ...asset, path: dest, skipped: false };
    } catch (error) {
      clearTimeout(timeoutId);
      console.error(`Failed ${asset.folder}/${asset.name}: ${error.message}`);
      if (attempt === retryCount) {
        return { ...asset, path: dest, failed: true, error: error.message };
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

async function runQueue(maxConcurrency = 4) {
  const queue = [...assets];
  const results = [];

  async function worker() {
    while (queue.length > 0) {
      const asset = queue.shift();
      results.push(await downloadImage(asset));
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(maxConcurrency, assets.length) }, () => worker())
  );

  return results;
}

async function main() {
  ensureDir(outputRoot);
  const startedAt = Date.now();
  const results = await runQueue(4);
  const manifest = {
    generatedAt: new Date().toISOString(),
    generator: 'generate_learning_assets.cjs',
    total: results.length,
    failed: results.filter((result) => result.failed).length,
    assets: results.map((result) => ({
      name: result.name,
      folder: result.folder,
      relativePath: `/generated_assets/${result.folder}/${result.name}`.replaceAll('\\', '/'),
      size: result.size,
      prompt: result.prompt,
      failed: Boolean(result.failed),
      skipped: Boolean(result.skipped),
      error: result.error,
    })),
  };

  fs.writeFileSync(
    path.join(outputRoot, 'asset_manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  const seconds = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`Done. ${results.length - manifest.failed}/${results.length} assets ready in ${seconds}s.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

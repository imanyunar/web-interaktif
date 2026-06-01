const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'generated_assets');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const assets = [
    // Backgrounds
    { name: 'bg_taman.png', prompt: 'A cartoon style outdoor park background for kids, bright sunny day, blue sky, green hills, large tree, 16:9 aspect ratio' },
    { name: 'bg_kelas.png', prompt: 'A cartoon style warm classroom background for kids, chalkboard, bookshelf, 16:9 aspect ratio' },
    { name: 'bg_watercolor.png', prompt: 'A soft light blue watercolor wash background, very subtle texture, minimalist, 16:9 aspect ratio' },
    { name: 'bg_outdoor_hijau.png', prompt: 'A vibrant green meadow background in a cartoon style for kids, expansive green grass, clear blue sky, 16:9 aspect ratio' },

    // Characters
    { name: 'guru_berdiri.png', prompt: 'Cute cartoon female teacher standing, wearing light brown hijab and brown dress uniform, cheerful smiling expression, transparent background, isolated 2d vector style' },
    { name: 'guru_duduk.png', prompt: 'Cute cartoon female teacher sitting at a desk, wearing light brown hijab, smiling, transparent background, isolated 2d vector style' },
    { name: 'anak_laki.png', prompt: 'Cute cartoon school boy standing, smiling, transparent background, isolated 2d vector style' },
    { name: 'anak_perempuan.png', prompt: 'Cute cartoon school girl standing, smiling, transparent background, isolated 2d vector style' },
    { name: 'anak_layang.png', prompt: 'Cute cartoon boy running and holding a colorful kite, transparent background, isolated 2d vector style' },

    // Flat shapes
    { name: 'shape_segitiga.png', prompt: 'Bright red equilateral triangle cartoon style sticker, white border, transparent background, isolated 2d vector' },
    { name: 'shape_persegi.png', prompt: 'Bright green square cartoon style sticker, white border, transparent background, isolated 2d vector' },
    { name: 'shape_persegi_panjang.png', prompt: 'Bright blue rectangle cartoon style sticker, white border, transparent background, isolated 2d vector' },
    { name: 'shape_lingkaran.png', prompt: 'Bright yellow circle cartoon style sticker, white border, transparent background, isolated 2d vector' },
    { name: 'shape_jajar_genjang.png', prompt: 'Bright orange parallelogram cartoon style sticker, white border, transparent background, isolated 2d vector' },
    { name: 'shape_belah_ketupat.png', prompt: 'Bright purple rhombus diamond cartoon style sticker, white border, transparent background, isolated 2d vector' },
    { name: 'shape_layang_layang.png', prompt: 'Bright pink kite shape cartoon style sticker, white border, transparent background, isolated 2d vector' },
    { name: 'shape_trapesium.png', prompt: 'Bright brown trapezoid cartoon style sticker, white border, transparent background, isolated 2d vector' },

    // Objects
    { name: 'obj_sandwich.png', prompt: 'A cartoon style triangle sandwich, sliced diagonally, transparent background, isolated' },
    { name: 'obj_penggaris.png', prompt: 'A cartoon style blue plastic triangular ruler, transparent background, isolated' },
    { name: 'obj_jam_dinding.png', prompt: 'A cute cartoon style square wall clock showing 10:10, transparent background, isolated' },
    { name: 'obj_papan_tulis.png', prompt: 'A cartoon style green school chalkboard with wooden frame, transparent background, isolated' },
    { name: 'obj_buku.png', prompt: 'A cartoon style closed blue book, front view, transparent background, isolated' },
    { name: 'obj_koin.png', prompt: 'A shiny gold round coin cartoon style, transparent background, isolated' },
    { name: 'obj_donat.png', prompt: 'A pink glazed round donut with sprinkles, cartoon style, transparent background, isolated' },
    { name: 'obj_layang_layang_asli.png', prompt: 'A colorful traditional paper kite with a tail, cartoon style, transparent background, isolated' },
    { name: 'obj_atap_rumah.png', prompt: 'A cartoon style brown triangular roof of a house, transparent background, isolated' },
];

async function downloadImage(name, prompt, retryCount = 2) {
    const dest = path.join(outputDir, name);
    
    // Skip if already downloaded and has size
    if (fs.existsSync(dest)) {
        const stats = fs.statSync(dest);
        if (stats.size > 1000) {
            console.log(`Skipping ${name} (already downloaded)`);
            return;
        }
    }

    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true`;
    
    for (let i = 0; i <= retryCount; i++) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout per download
        
        try {
            console.log(`Downloading ${name} (Attempt ${i + 1})...`);
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }
            
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            fs.writeFileSync(dest, buffer);
            console.log(`Saved ${name} (${buffer.length} bytes)`);
            return;
        } catch (err) {
            clearTimeout(timeoutId);
            console.error(`Error downloading ${name} on attempt ${i + 1}: ${err.message}`);
            if (i === retryCount) {
                throw err;
            }
            // Wait 2 seconds before retry
            await new Promise(r => setTimeout(r, 2000));
        }
    }
}

// Download assets in chunks of 3 to avoid overloading and stay quick
async function runQueue(assets, maxConcurrency = 3) {
    const queue = [...assets];
    const activePromises = [];
    
    async function worker() {
        while (queue.length > 0) {
            const asset = queue.shift();
            try {
                await downloadImage(asset.name, asset.prompt);
            } catch (e) {
                console.error(`FAILED to download ${asset.name} after retries:`, e.message);
            }
        }
    }
    
    const workers = [];
    for (let i = 0; i < Math.min(maxConcurrency, assets.length); i++) {
        workers.push(worker());
    }
    
    await Promise.all(workers);
}

async function main() {
    console.log('Generating PNG assets via Pollinations API...');
    const startTime = Date.now();
    await runQueue(assets, 3);
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`Finished in ${duration}s!`);
}

main();


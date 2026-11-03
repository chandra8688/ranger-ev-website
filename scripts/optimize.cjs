const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Reference paths relative to the project root
const projectRoot = path.resolve(__dirname, '..');
const inputDir = path.join(projectRoot, 'public/images/cinematic');
const ogImage = path.join(projectRoot, 'public/og-image.jpg');

async function optimizeImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
  let totalBefore = 0;
  let totalAfter = 0;
  
  const results = [];
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const statBefore = fs.statSync(inputPath);
    totalBefore += statBefore.size;
    
    // Output path: swap extension to .webp
    const outName = file.replace(/\.(jpg|jpeg)$/i, '.webp');
    const outputPath = path.join(inputDir, outName);
    
    // Optimize
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
      
    const statAfter = fs.statSync(outputPath);
    totalAfter += statAfter.size;
    
    results.push({
      asset: file,
      before: statBefore.size,
      after: statAfter.size,
      reduction: Math.round((1 - statAfter.size / statBefore.size) * 100)
    });
  }
  
  // Also optimize og-image
  if (fs.existsSync(ogImage)) {
    const statBefore = fs.statSync(ogImage);
    totalBefore += statBefore.size;
    
    const optimizedOgPath = path.join(projectRoot, 'public', 'og-image-opt.jpg');
    await sharp(ogImage)
      .jpeg({ quality: 80, progressive: true })
      .toFile(optimizedOgPath);
      
    const statOgAfter = fs.statSync(optimizedOgPath);
    
    results.push({
      asset: 'og-image.jpg',
      before: statBefore.size,
      after: statOgAfter.size,
      reduction: Math.round((1 - statOgAfter.size / statBefore.size) * 100)
    });
  }
  
  console.log(JSON.stringify({ results, totalBefore, totalAfter }, null, 2));
}

optimizeImages().catch(console.error);


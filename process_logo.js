const sharp = require('sharp');
const fs = require('fs');

async function removeBlackBackground(inputPath, outputPath) {
  try {
    const { data, info } = await sharp(inputPath)
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Calculate luminance or max color value
      const maxVal = Math.max(r, g, b);
      
      // We set the alpha to the max color value to make black transparent and keep the gold opaque
      // To prevent dark borders (pre-multiplied alpha effect), we scale RGB up based on the alpha
      if (maxVal > 0) {
        data[i] = Math.min(255, (r * 255) / maxVal);
        data[i + 1] = Math.min(255, (g * 255) / maxVal);
        data[i + 2] = Math.min(255, (b * 255) / maxVal);
        data[i + 3] = maxVal;
      } else {
        data[i + 3] = 0; // Pure black becomes fully transparent
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    }).toFile(outputPath);

    console.log("Successfully removed black background");
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

removeBlackBackground("public/logo-original.jpg", "public/logo.png");

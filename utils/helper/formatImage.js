const path = require("path");
const { createCanvas, loadImage } = require("canvas");

/**
 *
 * @param photos array of image urls
 * @returns image collage with numbering on each image
 */
async function generateCollage(photos) {
  try {
    // Set the desired width of the collage
    const collageWidth = 300;

    // Load all images and get their dimensions
    const images = await Promise.all(photos.map((photo) => loadImage(photo)));
    const heights = images.map(
      (image) => (image.height / image.width) * collageWidth
    );
    const totalHeight = heights.reduce((acc, height) => acc + height, 0);

    // Create a canvas with the total height and desired width
    const canvas = createCanvas(collageWidth, totalHeight);
    const ctx = canvas.getContext("2d");

    let yOffset = 0;
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const imgHeight = heights[i];

      // Draw each image to the canvas
      ctx.drawImage(img, 0, yOffset, collageWidth, imgHeight);

      // Add numbering
      ctx.font = "48px sans-serif";
      ctx.fillStyle = "black";
      ctx.fillText(`${i + 1}`, 10, yOffset + 50);

      yOffset += imgHeight;
    }

    // Save the canvas to a file
    const buffer = canvas.toBuffer("image/png");

    return buffer;
  } catch (error) {
    console.log("generate collage error");

    console.log(error);
  }
}

module.exports = {
  generateCollage,
};

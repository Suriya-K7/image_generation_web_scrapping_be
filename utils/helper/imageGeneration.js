const { deleteImage, uploadToDigitalOcean } = require("./digitalOcean");
const { fetchImagePexels, fetchImagePixabay } = require("./fetchImage");
const { generateCollage } = require("./formatImage");
const { generateKeyword, visionValidation } = require("./gptFunction");
const {
  getIntroPrompt,
  getIntroVisionPrompt,
  getOutroPrompt,
  getOutroVisionPrompt,
  getSectionPrompt,
  getSectionVisionPrompt,
} = require("./prompt");

/**
 *
 * @param generatedKeyword - generated keyword to search for images & prompt - prompt for gpt
 * @param prompt - prompt for gpt
 * @returns selected image url, image ID, token used by vision
 */
async function generateImagePexels(generatedKeyword, prompt, usedImage) {
  try {
    let imageResults = (
      await Promise.all(
        generatedKeyword.map((keyword) => fetchImagePexels(keyword))
      )
    ).flat();

    if (usedImage)
      imageResults = imageResults.filter(
        (img) => !usedImage.includes(img.image)
      );

    if (!imageResults.length) {
      return {
        result: "No Image found",
        tokenUsed: "0",
        imageId: null,
        collageImage: null,
      };
    }

    const allImagesUrls = imageResults.slice().map((img) => img.image);

    const collageImage = await generateCollage(allImagesUrls);

    const imageData = await uploadToDigitalOcean(collageImage);

    if (imageData.url) {
      const { result, tokenUsed } = await visionValidation(
        imageData.url,
        prompt,
        imageResults
      );

      console.log("pexels", result);

      return { result, tokenUsed, imageId: imageData.key };
    } else {
      return {
        result: "No Image found",
        tokenUsed: "0",
        imageId: null,
        collageImage: null,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      result: "No Image found",
      tokenUsed: "0",
      imageId: null,
      collageImage: null,
    };
  }
}

/**
 *
 * @param generatedKeyword - generated keyword to search for images & prompt - prompt for gpt
 * @param prompt - prompt for gpt
 * @returns selected image url, image ID, token used by vision
 */
async function generateImagePixabay(generatedKeyword, prompt, usedImage) {
  try {
    let imageResults = (
      await Promise.all(
        generatedKeyword.map((keyword) => fetchImagePixabay(keyword))
      )
    ).flat();

    if (usedImage)
      imageResults = imageResults.filter((image) => !usedImage.includes(image));

    if (!imageResults.length) {
      return {
        result: "No Image found",
        tokenUsed: "0",
        imageId: null,
        collageImage: null,
      };
    }

    const collageImage = await generateCollage(imageResults);

    const imageData = await uploadToDigitalOcean(collageImage);

    if (imageData.url) {
      const { result, tokenUsed } = await visionValidation(
        imageData.url,
        prompt,
        imageResults
      );

      console.log("pixabay", result);

      return { result, tokenUsed, imageId: imageData.key };
    } else {
      return {
        result: "No Image found",
        tokenUsed: "0",
        imageId: null,
        collageImage: null,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      result: "No Image found",
      tokenUsed: "0",
      imageId: null,
      collageImage: null,
    };
  }
}

/**
 *
 * @param generatorFunc - function to fetch image from either pexels or pixabay
 * @param visionPrompt - vision prompt for gpt
 * @param generatedKeyword - keywords to search in stock image sites
 * @param usedImage - used images in the blog
 * @returns selected image url, token used by vision
 */
async function generateAndCleanupImage(
  generatorFunc,
  visionPrompt,
  generatedKeyword,
  usedImage
) {
  const { result, tokenUsed, imageId } = await generatorFunc(
    generatedKeyword,
    visionPrompt,
    usedImage
  );

  if (imageId) deleteImage(imageId);

  return { result, tokenUsed };
}

/**
 *
 * @param blogTitle - title of the blog
 * @param blogOutline - All section heading as outline
 * @returns selected image url as result, token used by vision
 */
async function getIntroImage(blogTitle, blogOutline, usedImage) {
  try {
    const keywordPrompt = getIntroPrompt(blogTitle, blogOutline);
    const visionPrompt = getIntroVisionPrompt(blogTitle);
    const generatedKeyword = await generateKeyword(keywordPrompt);

    // Try Pexels first
    let { result, tokenUsed } = await generateAndCleanupImage(
      generateImagePexels,
      visionPrompt,
      generatedKeyword,
      usedImage
    );
    if (result !== "No Image found")
      return { result, tokenUsed, source: "pexels" };

    // Fallback to Pixabay
    ({ result, tokenUsed } = await generateAndCleanupImage(
      generateImagePixabay,
      visionPrompt,
      generatedKeyword,
      usedImage
    ));
    if (result !== "No Image found")
      return { result, tokenUsed, source: "pixabay" };

    // If no image is found from both sources
    return { result: "No Image found", tokenUsed: 2000, source: "n/a" };
  } catch (error) {
    console.log(error);
    return { result: "No Image found", tokenUsed: 2000, source: "n/a" };
  }
}

/**
 *
 * @param blogTitle - title of the blog
 * @param blogOutline - All section heading as outline
 * @returns selected image url as result, token used by vision
 */
async function getOutroImage(blogTitle, blogOutline, usedImage) {
  try {
    const keywordPrompt = getOutroPrompt(blogTitle, blogOutline);
    const visionPrompt = getOutroVisionPrompt(blogTitle);
    const generatedKeyword = await generateKeyword(keywordPrompt);

    // Try Pexels first
    let { result, tokenUsed } = await generateAndCleanupImage(
      generateImagePexels,
      visionPrompt,
      generatedKeyword,
      usedImage
    );
    if (result !== "No Image found")
      return { result, tokenUsed, source: "pexels" };

    // Fallback to Pixabay
    ({ result, tokenUsed } = await generateAndCleanupImage(
      generateImagePixabay,
      visionPrompt,
      generatedKeyword,
      usedImage
    ));
    if (result !== "No Image found")
      return { result, tokenUsed, source: "pixabay" };

    // If no image is found from both sources
    return { result: "No Image found", tokenUsed: 2000, source: "n/a" };
  } catch (error) {
    console.log(error);
    return { result: "No Image found", tokenUsed: 2000, source: "n/a" };
  }
}

/**
 *
 * @param blogTitle - title of the blog
 * @param sectionHeading - section heading of the blog
 * @returns selected image url as result, token used by vision
 */
async function getSectionImage(blogTitle, sectionHeading, usedImage) {
  try {
    const keywordPrompt = getSectionPrompt(blogTitle, sectionHeading);
    const visionPrompt = getSectionVisionPrompt(blogTitle, sectionHeading);
    const generatedKeyword = await generateKeyword(keywordPrompt);

    // Try Pexels first
    let { result, tokenUsed } = await generateAndCleanupImage(
      generateImagePexels,
      visionPrompt,
      generatedKeyword,
      usedImage
    );
    if (result !== "No Image found")
      return { result, tokenUsed, source: "pexels" };

    // Fallback to Pixabay
    ({ result, tokenUsed } = await generateAndCleanupImage(
      generateImagePixabay,
      visionPrompt,
      generatedKeyword,
      usedImage
    ));
    if (result !== "No Image found")
      return { result, tokenUsed, source: "pixabay" };

    // If no image is found from both sources
    return { result: "No Image found", tokenUsed: 2000, source: "n/a" };
  } catch (error) {
    console.log(error);
    return { result: "No Image found", tokenUsed: 2000, source: "n/a" };
  }
}

module.exports = {
  getIntroImage,
  getOutroImage,
  getSectionImage,
};

const { createClient } = require("pexels");
const { PEXELS_API_KEY, PIXABAY_API_KEY } = require("../config");

// pexels config
const client = createClient(PEXELS_API_KEY);

/**
 *
 * @param query to generate images using pexels
 * @returns Array of images urls
 */
async function fetchImagePexels(query) {
  try {
    const res = await client.photos.search({
      query: query,
      orientation: "landscape",
      size: "small",
      per_page: 5,
    });

    const image = res.photos;

    const fomartedImage = image.map((img) => {
      return {
        image: img.src.large2x,
        photographer: img.photographer,
        photographer_url: img.photographer_url,
        pexel_url: img.url,
      };
    });

    return fomartedImage;
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 * @param query to generate images using pixabay
 * @returns Array of images urls
 */
async function fetchImagePixabay(query) {
  try {
    const encodedQuery = encodeURIComponent(query);

    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodedQuery}&image_type=photo&orientation=horizontal&per_page=5`;

    const response = await fetch(url);

    const result = await response.json();

    const formatedResponse = result.hits.map((img) => img.largeImageURL);

    return formatedResponse;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fetchImagePexels,
  fetchImagePixabay,
};

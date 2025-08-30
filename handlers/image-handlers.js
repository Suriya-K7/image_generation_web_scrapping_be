const HTTPResponseBuilder = require("../utils/HTTPResponseBuilder");
const {
  getIntroImage,
  getSectionImage,
  getOutroImage,
} = require("../utils/helper/imageGeneration");

async function imageIntroHandler(payload) {
  try {
    const { blogTitle, blogOutline, usedImage } = payload;

    if (!blogTitle || !blogOutline) {
      return new HTTPResponseBuilder()
        .setBody({ message: "Please provide a title and outline for the blog" })
        .setStatusCode(400)
        .build();
    }

    const { result, tokenUsed, source } = await getIntroImage(
      blogTitle,
      blogOutline,
      usedImage
    );

    let responseBody = {
      data: source === "pexels" ? result : { image: result },
      tokenUsed,
      source,
      status: source === "n/a" ? 404 : 200,
    };

    return new HTTPResponseBuilder()
      .setBody(responseBody)
      .setStatusCode(200)
      .build();
  } catch (error) {
    return new HTTPResponseBuilder()
      .setBody({ error })
      .setStatusCode(500)
      .build();
  }
}

async function imageOutroHandler(payload) {
  try {
    const { blogTitle, blogOutline, usedImage } = payload;

    if (!blogTitle || !blogOutline) {
      return new HTTPResponseBuilder()
        .setBody({ message: "Please provide a title and outline for the blog" })
        .setStatusCode(400)
        .build();
    }

    const { result, tokenUsed, source } = await getOutroImage(
      blogTitle,
      blogOutline,
      usedImage
    );

    let responseBody = {
      data: source === "pexels" ? result : { image: result },
      tokenUsed,
      source,
      status: source === "n/a" ? 404 : 200,
    };

    return new HTTPResponseBuilder()
      .setBody(responseBody)
      .setStatusCode(200)
      .build();
  } catch (error) {
    console.log(error);
    return new HTTPResponseBuilder()
      .setBody({ error })
      .setStatusCode(500)
      .build();
  }
}

async function imageSectionHandler(payload) {
  try {
    const { blogTitle, sectionHeading, usedImage } = payload;

    if (!blogTitle || !sectionHeading) {
      return new HTTPResponseBuilder()
        .setBody({
          message: "Please provide a title and section heading for the blog",
        })
        .setStatusCode(400)
        .build();
    }

    const { result, tokenUsed, source } = await getSectionImage(
      blogTitle,
      sectionHeading,
      usedImage
    );

    let responseBody = {
      data: source === "pexels" ? result : { image: result },
      tokenUsed,
      source,
      status: source === "n/a" ? 404 : 200,
    };

    return new HTTPResponseBuilder()
      .setBody(responseBody)
      .setStatusCode(200)
      .build();
  } catch (error) {
    return new HTTPResponseBuilder()
      .setBody({ error })
      .setStatusCode(500)
      .build();
  }
}

module.exports = {
  imageIntroHandler,
  imageOutroHandler,
  imageSectionHandler,
};

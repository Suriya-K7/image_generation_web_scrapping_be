const {
  imageIntroHandler,
  imageOutroHandler,
  imageSectionHandler,
} = require("./image-handlers");

const handlers = {
  "image-intro": imageIntroHandler,
  "image-outro": imageOutroHandler,
  "image-section": imageSectionHandler,
};

module.exports = handlers;

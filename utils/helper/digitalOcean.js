const {
  DO_SPACES_BUCKET,
  DO_SPACES_KEY,
  DO_SPACES_SECRET,
  DO_SPACES_ENDPOINT,
  DO_SPACES_REGION,
} = require("../config");

// config for digital ocean spaces
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: DO_SPACES_REGION, // Change to your region
  endpoint: DO_SPACES_ENDPOINT, // Change to your endpoint
  credentials: {
    accessKeyId: DO_SPACES_KEY,
    secretAccessKey: DO_SPACES_SECRET,
  },
});

/**
 *
 * @param filePath image file path to upload
 * @returns image url and key of image
 */
// async function uploadToDigitalOcean(filePath) {
async function uploadToDigitalOcean(buffer) {
  try {
    // create random number
    const randomNumber = Math.floor(Math.random() * 1000000000);

    const uploadParams = {
      Bucket: DO_SPACES_BUCKET,
      Key: `temp_image/image${randomNumber}${Math.floor(
        Math.random() * 1000
      )}.png`,
      Body: buffer,
      ACL: "public-read",
      ContentType: "image/png",
    };

    const command = new PutObjectCommand(uploadParams);

    await s3Client.send(command);

    const url = `https://gravitywrite.sgp1.digitaloceanspaces.com/${uploadParams.Key}`;

    const key = uploadParams.Key;

    const imageData = { key, url };

    return imageData;
  } catch (error) {
    console.log(error);

    return "error on uploading image to digital ocean";
  }
}

/**
 *
 * @param key image file key to delete
 */
async function deleteImage(key) {
  try {
    const deleteParams = {
      Bucket: DO_SPACES_BUCKET,
      Key: key,
    };

    const command = new DeleteObjectCommand(deleteParams);

    await s3Client.send(command);
  } catch (error) {
    console.log(error);

    return "error on uploading image to digital ocean";
  }
}

module.exports = { uploadToDigitalOcean, deleteImage };

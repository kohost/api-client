import generateFunctions from "../utils/generate";

const images = generateFunctions("/images");

async function uploadImage(formData, callbackFn) {
  return await this.uploadFile("/structure/images/upload", formData, callbackFn);
}

images.uploadImage = uploadImage;
export default images;

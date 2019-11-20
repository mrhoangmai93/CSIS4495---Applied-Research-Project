const DOCUMENT = "IMAGE_";

//UPLOAD
export const UPLOAD = `${DOCUMENT}UPLOAD`;
export const UPLOADED = `${DOCUMENT}UPLOADED`;
export const UPLOAD_ERROR = `${DOCUMENT}UPLOAD_ERROR`;

//upload image
export const uploadImage = file => ({
  type: UPLOAD,
  file
});

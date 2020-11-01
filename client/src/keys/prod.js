export default {
  socketEndPoint: process.env.SOCKET_END_POINT,
  cloudinary: {
    APIkey: process.env.CLOUDINARY_API_KEY,
    APISecret: process.env.CLOUDINARY_API_SECRET,
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    name: process.env.CLOUDINARY_NAME
  }
};

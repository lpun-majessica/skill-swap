import "dotenv/config";

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

const CLOUDINARY_CONFIG = {
  cloudName: "skill-swap",
  uploadPreset: "profile-picture",
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
};

export { MONGODB_URI, CLOUDINARY_URL, CLOUDINARY_CONFIG };

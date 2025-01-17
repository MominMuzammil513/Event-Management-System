import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file to Cloudinary and deletes the local file after upload.
 * @param {string} localFilePath - The path to the local file.
 * @param {string} [fileType="image"] - The type of file ("image" or "video").
 * @returns {Promise<Object|null>} - The Cloudinary response or null if upload fails.
 */
export const uploadImage = async (localFilePath, fileType = "image") => {
  try {
    if (!localFilePath) return null;

    // Define upload options
    let uploadOptions = {
      resource_type: "auto", // Automatically detect the file type
      folder: "event-management", // Save files in the "event-management" folder
    };

    // Add video-specific options if the file is a video
    if (fileType === "video") {
      uploadOptions = {
        ...uploadOptions,
        resource_type: "video",
        audio_codec: "aac", // Specify audio codec for videos
        video_codec: "auto", // Let Cloudinary choose the best video codec
      };
    }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, uploadOptions);

    // Delete the local file after successful upload
    fs.unlinkSync(localFilePath);

    console.log("File successfully uploaded on Cloudinary:", response.url);
    return response;
  } catch (error) {
    // Remove the locally saved temporary file if the upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Failed to upload file on Cloudinary:", error);
    throw new Error("Failed to upload file");
  }
};
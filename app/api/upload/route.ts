import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[]; // Get all files with the key "images"

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // Prepare an array of upload promises
    const uploadPromises = files.map((file) => {
      return new Promise(async (resolve, reject) => {
        const fileBuffer = Buffer.from(await file.arrayBuffer()); // Convert file to Buffer
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "portfolio" }, // Specify your folder
          (error, result) => {
            if (error) {
              reject(error); // Handle the error
            } else {
              resolve(result); // Resolve the upload result
            }
          }
        );
        uploadStream.end(fileBuffer); // End the stream and upload
      });
    });

    // Wait for all uploads to complete
    const uploadResponses = await Promise.all(uploadPromises);

    // Extract URLs from upload responses
    const urls = uploadResponses.map((response:any) => response.secure_url);

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

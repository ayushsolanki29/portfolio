import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // Parse the form data to extract the file
    const formData = await request.formData();
    const file = formData.get('thumbnail') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" });
    }

    // Convert file to buffer for Cloudinary
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Upload the image to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "portfolio" }, // Optional folder for Cloudinary organization
        (error, result: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
      uploadStream.end(fileBuffer);
    });

    return NextResponse.json({ success: true, imageUrl: uploadResponse });
  } catch (error: any) {
    console.error("Error uploading image: ", error.message);
    return NextResponse.json({ success: false, message: error.message });
  }
}

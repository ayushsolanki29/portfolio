import { connectToDatabase } from "@/lib/db";
import TechStack from "@/models/TechStack";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  await connectToDatabase();

  // Parse the form data
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const file = formData.get("image") as File | null;

  try {
    // Upload the image to Cloudinary
    let imageUrl = "";
    if (file) {
      const uploadResponse = await new Promise(async (resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "portfolio" },
          (error, result: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );

        // Convert file to a Buffer and send to Cloudinary
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        uploadStream.end(fileBuffer);
      });
      imageUrl = uploadResponse as string;
    }

    // Add tech stack to MongoDB using Mongoose
    const addTechStacks = await TechStack.create({
      name,
      role,
      image: imageUrl,
    });
    await addTechStacks.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "TechStacks added successfully",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error(`Error adding TechStacks: ${error.message}`);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

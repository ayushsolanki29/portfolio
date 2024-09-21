// app/api/images/add/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db"; // Adjust this import based on your DB connection file
import cloudinary from "cloudinary";
import Image from "@/models/Image";
import { imageSchema } from "@/schema/imageSchema";
import { z } from "zod";


const AddFormSchema = z.object({
  projectId: z.string().min(1, {
    message: "Please Select Project",
  }),
  images: z.array(imageSchema).nonempty("At least one image is required"),
});
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const formData = await req.formData();
    const imageFiles = formData.getAll("images") as File[];

    // Validate the form data
    const result = AddFormSchema.safeParse({
      projectId: formData.get("projectId"),
      images: imageFiles,
    });

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.formErrors.fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Upload images to Cloudinary
    const uploadPromises = data.images.map((image: File) => {
      return new Promise(async (resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "portfolio" },
          (error, result: any) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );

        uploadStream.end(Buffer.from(await image.arrayBuffer()));
      });
    });

    // Wait for all uploads to complete
    const uploadedImageUrls = await Promise.all(uploadPromises);

    // Save image URLs to the database
    const imageSavePromises = uploadedImageUrls.map((imgUrl: any) =>
      Image.create({
        projectId: data.projectId,
        imageUrl: imgUrl,
      })
    );

    await Promise.all(imageSavePromises);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Images uploaded successfully!",
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

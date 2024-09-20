"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import Image from "@/models/Image";

// Schema for individual image validation
const imageSchema = z
  .instanceof(File, {
    message: "File Required",
  })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
    message: "Please select an image",
  });

// Update schema to handle multiple files
const AddFormSchema = z.object({
  projectId: z.string().min(1, {
    message: "Please Select Project",
  }),
  images: z
    .array(imageSchema)
    .nonempty("At least one image is required"),
});

export async function uploadImages(prevState: unknown, formData: FormData) {
  // Retrieve all images from the form data
  const imageFiles = formData.getAll("images") as File[];

  // Validate the form data
  const result = AddFormSchema.safeParse({
    projectId: formData.get("projectId"),
    images: imageFiles,
  });

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // Create the directory if it doesn't exist
  await fs.mkdir("public/images", { recursive: true });

  // Process and save each image
  const imageUploadPromises = data.images.map(async (image) => {
    const imgPath = `/images/${crypto.randomUUID()}-${image.name}`;
    await fs.writeFile(
      `public${imgPath}`,
      Buffer.from(await image.arrayBuffer())
    );
    return imgPath;
  });

  // Wait for all images to be uploaded
  const uploadedImagePaths = await Promise.all(imageUploadPromises);

  // Save image URLs to the database
  const imageSavePromises = uploadedImagePaths.map((imgPath) =>
    Image.create({
      projectId: data.projectId,
      imageUrl: imgPath,
    })
  );

  await Promise.all(imageSavePromises);

  // Revalidate paths and redirect
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin/images");
}

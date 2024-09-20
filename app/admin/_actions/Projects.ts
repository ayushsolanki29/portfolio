"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import fs from "fs/promises";
import mongoose from "mongoose";
import Project from "@/models/Project";

const imageSchema = z
  .instanceof(File, {
    message: "File Required",
  })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
    message: "Please select an image",
  });

const AddFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  thumbnail: imageSchema.refine((file) => file.size > 0, "Image Required"),
  content: z.string().min(1, { message: "Content is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  techStacks: z.string().optional(),
});
const editFormSchema = AddFormSchema.extend({
  thumbnail: imageSchema.optional(),
});
export async function addProject(prevState: unknown, formData: FormData) {
  const result = AddFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // Parse techStacks JSON
  let techStacksArray: mongoose.Types.ObjectId[] = [];
  if (data.techStacks) {
    try {
      techStacksArray = JSON.parse(data.techStacks).map(
        (id: string) => new mongoose.Types.ObjectId(id)
      );
    } catch (error) {
      console.error("Error parsing techStacks:", error);
    }
  }

  await fs.mkdir("public/projects", { recursive: true });
  const imgPath = `/projects/${crypto.randomUUID()}-${data.thumbnail.name}`;
  await fs.writeFile(
    `public${imgPath}`,
    Buffer.from(await data.thumbnail.arrayBuffer())
  );

  const ProjectSaved = await Project.create({
    title: data.title,
    description: data.description,
    thumbnail: imgPath,
    content: data.content,
    slug: data.slug,
    githubUrl: data.githubUrl || null,
    liveUrl: data.liveUrl || null,
    techStacks: techStacksArray,
  });

  if (ProjectSaved) {
    revalidatePath("/");
    revalidatePath("/projects");
    redirect("/admin/projects");
  }
}
export async function EditProject(
  _id: string,
  prevState: unknown,
  formData: FormData
) {
  // Validate the form data
  const result = editFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  
  const data = result.data;

  // Find the project by id
  const project = await Project.findById({ _id });
  if (!project) {
    return notFound();
  }

  let imgPath = project.thumbnail;
  if (data.thumbnail && data.thumbnail.size > 0) {
    // Remove the old image file if it exists
    if (project.thumbnail) {
      await fs.unlink(`public${project.thumbnail}`);
    }

    // Create a new path for the uploaded image
    await fs.mkdir("public/projects", { recursive: true });
    imgPath = `/projects/${crypto.randomUUID()}-${data.thumbnail.name}`;
    await fs.writeFile(
      `public${imgPath}`,
      Buffer.from(await data.thumbnail.arrayBuffer())
    );
  }

  // Parse techStacks JSON
  let techStacksArray: mongoose.Types.ObjectId[] = [];
  if (data.techStacks) {
    try {
      techStacksArray = JSON.parse(data.techStacks).map(
        (id: string) => new mongoose.Types.ObjectId(id)
      );
    } catch (error) {
      console.error("Error parsing techStacks:", error);
    }
  }

  // Update the project
  await Project.findByIdAndUpdate(_id, {
    title: data.title,
    description: data.description,
    thumbnail: imgPath,
    content: data.content,
    slug: data.slug,
    githubUrl: data.githubUrl || null,
    liveUrl: data.liveUrl || null,
    techStacks: techStacksArray,
  });

  // Revalidate and redirect
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

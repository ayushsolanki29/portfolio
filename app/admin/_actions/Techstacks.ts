"use server";
import { z } from "zod";
import TechStack from "@/models/TechStack";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs/promises";
const imageSchema = z
  .instanceof(File, {
    message: "File Required",
  })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
    message: "Please select an image",
  });

const AddFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  role: z.string().min(1, { message: "Role is required" }),
  image: imageSchema.refine((file) => file.size > 0, "Image Required"),
});
const editFormSchema = AddFormSchema.extend({
  image: imageSchema.optional(),
});
export async function addTechStacks(prevState: unknown, formData: FormData) {
  const result = AddFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;

  await fs.mkdir("public/tech-stacks", { recursive: true });
  const imgPath = `/tech-stacks/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imgPath}`,
    Buffer.from(await data.image.arrayBuffer())
  );
  const TechStackSaved = await TechStack.create({
    name: data.name,
    role: data.role,
    image: imgPath,
  });

  if (TechStackSaved) {
    revalidatePath("/");
    revalidatePath("/projects");
    redirect("/admin/tech-stacks");
  }
}
export async function updateTechstacks(
  _id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;
  const techStack = await TechStack.findById({ _id });

  let imgPath = techStack.thumbnail;
  if (data.image && data.image.size > 0) {
    // Remove the old image file if it exists
    if (techStack.imageUrl) {
      await fs.unlink(`public${techStack.imageUrl}`);
    }

    // Create a new path for the uploaded image
    await fs.mkdir("public/tech-stacks", { recursive: true });
    imgPath = `/tech-stacks/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imgPath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }
  const TechStackSaved = await TechStack.findByIdAndUpdate(_id, {
    name: data.name,
    role: data.role,
    imageUrl: imgPath,
  });

  if (TechStackSaved) {
    revalidatePath("/");
    revalidatePath("/projects");
    redirect("/admin/tech-stacks");
  }
}

export async function GetTechStackList() {
  const techStacks = await TechStack.find({}).select({ name: 1, id: 1 });
  return techStacks.map((techStack) => ({
    id: techStack._id.toString(), // Ensure `_id` is converted to a string
    name: techStack.name,
  }));
}

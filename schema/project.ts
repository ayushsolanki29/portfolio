import { z } from "zod";
import { imageSchema } from "./imageSchema";

export const AddProjectSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  thumbnail: imageSchema.refine((file) => file.size > 0, "Image Required"),
  content: z.string().min(1, { message: "Content is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  techStacks: z.string().optional(),
});

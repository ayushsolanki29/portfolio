import { z } from "zod";

export const imageSchema = z
  .instanceof(File, {
    message: "File Required",
  })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
    message: "Please select an image",
  });

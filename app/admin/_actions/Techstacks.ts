"use server";

import TechStack from "@/models/TechStack";

export async function GetTechStackList() {
  const techStacks = await TechStack.find({}).select({ name: 1, id: 1 });
  return techStacks.map((techStack) => ({
    id: techStack._id.toString(), // Ensure `_id` is converted to a string
    name: techStack.name,
  }));
}

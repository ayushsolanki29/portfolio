"use server";

import { connectToDatabase } from "@/lib/db";
import Image from "@/models/Image";
import Project from "@/models/Project";
import TechStack from "@/models/TechStack";

export async function getProjects() {
  await connectToDatabase();
  const data = await Project.countDocuments();
  if (data > 0) {
    return data;
  }
  return 0;
}
export async function getTechStacts() {
  await connectToDatabase();
  const data = await TechStack.countDocuments();
  if (data > 0) {
    return data;
  }
  return 0;
}
export async function getImages() {
  await connectToDatabase();
  const data = await Image.countDocuments();
  if (data > 0) {
    return data;
  }
  return 0;
}

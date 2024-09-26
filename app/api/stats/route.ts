"use server";

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Image from "@/models/Image";
import Project from "@/models/Project";
import TechStack from "@/models/TechStack";
import Contact from "@/models/Contact";

async function countDocuments(model: any) {
  await connectToDatabase();
  return model.countDocuments();
}

export async function GET() {
  try {
    const [projectCount, techStackCount, imageCount, contactCount] =
      await Promise.all([
        countDocuments(Project),
        countDocuments(TechStack),
        countDocuments(Image),
        countDocuments(Contact),
      ]);

    return NextResponse.json({
      success: true,
      stats: {
        projects: projectCount || 0,
        techStacks: techStackCount || 0,
        images: imageCount || 0,
        contacts: contactCount || 0,
      },
    });
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectToDatabase();

  const {
    title,
    description,
    content,
    slug,
    githubUrl,
    liveUrl,
    techStacks,
    thumbnail,
  } = await request.json();
  console.log(
    "Received project data:",
    title,
    description,
  "content :" ,  content,
    slug,
    githubUrl,
    liveUrl,
    techStacks,
    "thumb :",
    thumbnail
  );

  try {
    await Project.create({
      title,
      description,
      content,
      slug,
      githubUrl,
      liveUrl,
      techStacks,
      thumbnail, // Now receiving the image URL directly
    });

    return NextResponse.json({
      success: true,
      message: "Project added successfully",
    });
  } catch (error: any) {
    console.error(`Error adding project: ${error}`);
    return NextResponse.json({ success: false, message: error.message });
  }
}

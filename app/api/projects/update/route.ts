// app/api/projects/[id]/route.ts

import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  const projectId = params.id;
  const updatedData = await request.json();

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    // Update project fields
    Object.assign(project, updatedData);

    // Save the updated project
    await project.save();

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project: {
        _id: project._id,
        title: project.title,
        description: project.description,
        thumbnail: project.thumbnail,
        content: project.content,
        slug: project.slug,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        techStacks: project.techStacks,
      },
    });
  } catch (error: any) {
    console.error(`Error updating project: ${error.message}`);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

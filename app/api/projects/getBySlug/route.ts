import { connectToDatabase } from "@/lib/db"; // Adjust the path as needed
import Project from "@/models/Project"; // Adjust the path as needed
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { success: false, message: "Slug is required" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase(); // Ensure you connect to the database

    const project = await Project.aggregate([
      {
        $match: { slug }, // Match the project with the given slug
      },
      {
        $lookup: {
          from: "techstacks", // The name of the tech stacks collection
          localField: "techStacks", // Field in the Project collection
          foreignField: "_id", // Field in the TechStack collection
          as: "techStacks", // Output array containing matched tech stacks
        },
      },
      {
        $lookup: {
          from: "images", // The name of the images collection
          localField: "_id", // Field in the Project collection
          foreignField: "projectId", // Field in the Image collection
          as: "images", // Output array containing matched images
        },
      },
      {
        $project: {
          title: 1,
          githubUrl: 1,
          liveUrl: 1,
          description: 1,
          content: 1,
          slug: 1,
          thumbnail: 1,
          techStacks: {
            name: 1,
            image: 1,
            role: 1,
          },
          images: {
            imageUrl: 1, // Include image URLs in the result
            _id: 1, // Keep the image _id if needed
          },
        },
      },
    ]);

    if (project.length > 0) {
      return NextResponse.json({ success: true, project: project[0] });
    } else {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error(`Error fetching project: ${error.message}`);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

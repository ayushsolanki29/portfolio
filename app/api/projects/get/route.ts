import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import TechStack from "@/models/TechStack";
import Image from "@/models/Image";

async function fetchProjectsWithTechStacks() {
  // Fetch all projects
  const projects = await Project.find({}).sort({ createdAt: "desc" });

  // Get all project IDs
  const projectIds = projects.map((project) => project._id.toString());

  // Bulk fetch images for all projects
  const allImages = await Image.find({ projectId: { $in: projectIds } });

  // Group images by project ID
  const imagesByProjectId = allImages.reduce((acc, image) => {
    const projectId = image.projectId.toString();
    if (!acc[projectId]) {
      acc[projectId] = [];
    }
    acc[projectId].push(image.imageUrl);
    return acc;
  }, {} as Record<string, string[]>);

  // Process projects with their respective tech stacks and images
  const projectsWithTechStacks = await Promise.all(
    projects.map(async (project) => {
      const projectObj = project.toObject();

      // Fetch associated tech stacks
      const techStacks = await TechStack.find({
        _id: { $in: project.techStacks },
      });

      return {
        _id: projectObj._id.toString(),
        title: projectObj.title,
        description: projectObj.description,
        slug: projectObj.slug,
        thumbnail: projectObj.thumbnail,
        githubUrl: projectObj.githubUrl,
        liveUrl: projectObj.liveUrl,
        techStacks: techStacks.map((techStack) => techStack.name),
        images: imagesByProjectId[projectObj._id.toString()] || [],
        createdAt: projectObj.createdAt,
        updatedAt: projectObj.updatedAt,
      };
    })
  );

  return projectsWithTechStacks;
}

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await fetchProjectsWithTechStacks();
    
    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error: any) {
    console.error(`Error fetching projects: ${error.message}`);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

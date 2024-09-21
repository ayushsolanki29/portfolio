import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";

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

  try {
    const addProject = await Project.create({
      title,
      description,
      thumbnail,
      content,
      slug,
      githubUrl,
      liveUrl,
      techStacks,
    });

    await addProject.save();

    return Response.json({
      success: true,
      message: "Project added successfully",
    });
  } catch (error: any) {
    console.error(`Error adding project: ${error.message}`);
    return Response.json({ success: false, message: error.message });
  }
}

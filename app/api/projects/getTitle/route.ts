import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";

export async function GET(request: Request) {
  await connectToDatabase();

  try {
    // Fetch project IDs and titles
    const projects = await Project.find({})
      .select({ _id: 1, title: 1 }) // Select only the _id and title fields
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    // Format the projects into the desired shape
    const formattedProjects = projects.map((project) => ({
      value: project._id.toString(), // Convert ObjectId to string
      label: project.title,
    }));

    return Response.json({
      success: true,
      projects: formattedProjects, // Return formatted projects
    });
  } catch (error: any) {
    console.error(`Error fetching projects: ${error.message}`);
    return Response.json({ success: false, message: error.message });
  }
}

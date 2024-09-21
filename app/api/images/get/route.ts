import { connectToDatabase } from "@/lib/db";
import Image from "@/models/Image";
import Project from "@/models/Project";

export async function GET(request: Request) {
  await connectToDatabase();

  try {
    // Fetch all images from the database, sorted by createdAt
    const imagesDatabase = await Image.find({}).sort({ createdAt: "desc" });

    // Check if there are no images in the database
    if (imagesDatabase.length === 0) {
      return Response.json({ success: false, message: "No Images Found!" });
    }

    // Fetch associated projects and add project title to each image
    const imagesWithProjects = await Promise.all(
      imagesDatabase.map(async (image) => {
        // Fetch the project associated with the image's projectId
        const project = image.projectId
          ? await Project.findById(image.projectId)
          : null;

        return {
          id: image._id.toString(), // Convert ObjectId to string
          name: image.name, // Select only the name
          imageUrl: image.imageUrl,
          projectTitle: project ? project.title : "No Project Found", // Set project title or default text
        };
      })
    );

    return Response.json({
      success: true,
      images: imagesWithProjects,
    });
  } catch (error: any) {
    console.error(`Error fetching images: ${error.message}`);
    return Response.json({ success: false, message: error.message });
  }
}

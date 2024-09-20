import Project from "@/models/Project";
import { notFound, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path"; // Import the path module for safer file paths
import Image from "@/models/Image";
import { revalidatePath } from "next/cache";

export async function GET(
  req: NextRequest,
  { params: { projectId } }: { params: { projectId: string } }
) {
  if (!projectId) {
    return notFound();
  }

  try {
    const project = await Project.findOne({ _id: projectId });
    if (!project) {
      return notFound();
    }

    // Fetch associated images
    const images = await Image.find({ projectId: project._id });

    // Delete the project's thumbnail if it exists
    if (project.thumbnail) {
      const thumbnailPath = path.join("public", project.thumbnail);
      await fs.unlink(thumbnailPath).catch((err) => {
        if (err.code !== "ENOENT") {
          console.error(`Failed to delete thumbnail: ${err.message}`);
        }
      });
    }

    // Delete each image associated with the project
    if (images) {
      await Promise.all(
        images.map(async (image) => {
          // Assuming the image model has a 'path' or 'url' property with the file path
          const imagePath = path.join("public", image.imageUrl); // Adjust this line based on your model's structure

          await fs.unlink(imagePath).catch((err) => {
            if (err.code !== "ENOENT") {
              console.error(`Failed to delete image: ${err.message}`);
            }
          });
        })
      );

      // Remove image entries from the database
      await Image.deleteMany({ projectId: project._id });
    }

    // Remove the project from the database
    await Project.findByIdAndDelete(projectId);

    // Revalidate the paths to update cached pages
    revalidatePath("/");
    revalidatePath("/projects");

    // Redirect to the admin project page
    redirect("/admin/projects");
  } catch (error: any) {
    console.error(`Error deleting project: ${error.message}`);
    return NextResponse.json({ success: false, message: error.message });
  }
}

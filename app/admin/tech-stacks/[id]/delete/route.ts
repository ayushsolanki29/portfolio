import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import TechStack from "@/models/TechStack";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  if (!id) {
    return notFound();
  }

  try {
    const techStack = await TechStack.findOne({ _id: id });
    if (!techStack) {
      return notFound();
    }
    // Delete the project's thumbnail if it exists
    if (techStack.image) {
      const thumbnailPath = path.join("public", techStack.image);
      await fs.unlink(thumbnailPath).catch((err) => {
        if (err.code !== "ENOENT") {
          console.error(`Failed to delete thumbnail: ${err.message}`);
        }
      });
    }
    // Remove the project from the database
    await TechStack.findByIdAndDelete(id);

    // Revalidate the paths to update cached pages
    revalidatePath("/");
    revalidatePath("/projects");

    // Redirect to the admin project page
    return NextResponse.json({
      success: true,
      message: "Tech stack deleted successfully",
    });
  } catch (error: any) {
    console.error(`Error deleting project: ${error.message}`);
    return NextResponse.json({ success: false, message: error.message });
  }
}

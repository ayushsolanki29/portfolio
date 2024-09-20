import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import Image from "@/models/Image";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  if (!id) {
    return notFound();
  }

  try {
    const image = await Image.findOne({ _id: id });
    if (!image) {
      return notFound();
    }
    // Delete the project's thumbnail if it exists
    if (image.imageUrl) {
      const thumbnailPath = path.join("public", image.imageUrl);
      await fs.unlink(thumbnailPath).catch((err) => {
        if (err.code !== "ENOENT") {
          console.error(`Failed to delete thumbnail: ${err.message}`);
        }
      });
    }
    // Remove the project from the database
    await Image.findByIdAndDelete(id);

    // Revalidate the paths to update cached pages
    revalidatePath("/");
    revalidatePath("/projects");

    // Redirect to the admin project page
    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error: any) {
    console.error(`Error deleting project: ${error.message}`);
    return NextResponse.json({ success: false, message: error.message });
  }
}

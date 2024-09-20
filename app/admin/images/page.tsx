import React from "react";
import PageHeader from "../_components/FileHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import Image from "@/models/Image";
import Project from "@/models/Project";
// import Image from "next/image";

const ImagesPage = () => {
  return (
    <div className="container flex flex-col h-screen">
      <div className="flex justify-between">
        <PageHeader>Realted Images</PageHeader>
        <Link href={"/admin/images/new"}>
          <Button size={"sm"} variant={"default"}>
            Upload New Images
          </Button>
        </Link>
      </div>
      <div className="mt-8">{<ImagesTable />}</div>
    </div>
  );
};

export default ImagesPage;
async function ImagesTable() {
  // Fetch images sorted by creation date
  const imagesDatabase = await Image.find({}).sort({ createdAt: "desc" });

  // Check if there are no images in the database
  if (imagesDatabase.length === 0) return <p>No Images Found!</p>;

  // Fetch associated projects and add project title to each image
  const imagesWithProjects = await Promise.all(
    imagesDatabase.map(async (image) => {
      // Fetch the project associated with the image's projectId
      const project = image.projectId
        ? await Project.findById(image.projectId)
        : null;
      return {
        ...image.toObject(),
        projectTitle: project ? project.title : "No Project Found", // Set project title or default text
      };
    })
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Image URL</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {imagesWithProjects.map((imageData: any) => (
          <TableRow key={imageData._id}>
            {/* Display project title */}
            <TableCell>{imageData.projectTitle}</TableCell>

            {/* Display clickable image URL */}
            <TableCell>
              <Link
                href={imageData.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click to Show Image
              </Link>
            </TableCell>

            {/* Actions dropdown */}
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={`/admin/images/${imageData._id}/delete`}>
                      Delete
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

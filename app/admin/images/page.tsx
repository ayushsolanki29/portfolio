"use client"
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import toast from "react-hot-toast";

const ImagesPage = () => {
  return (
    <div className="container flex flex-col h-full">
      <div className="flex justify-between">
        <PageHeader>Related Images</PageHeader>
        <Link href={"/admin/images/new"}>
          <Button size={"sm"} variant={"default"}>
            Upload New Images
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <ImagesTable />
      </div>
    </div>
  );
};

const ImagesTable = () => {
  const [imagesWithProjects, setImagesWithProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/images/get"); // Adjust the endpoint as needed
        if (response.data.success) {
          setImagesWithProjects(response.data.images);
        } else {
          toast.error(response.data.message || "Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Error fetching images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p>Loading images...</p>;
  if (imagesWithProjects.length === 0) return <p>No Images Found!</p>;

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
};

export default ImagesPage;

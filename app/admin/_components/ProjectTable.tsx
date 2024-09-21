"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProjectsTable = ({ projects }: { projects: any[] }) => {
  if (!projects || projects.length === 0) return <p>No Project Found!!</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Thumbnail</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Urls</TableHead>
          <TableHead>Tech Stacks</TableHead>
          <TableHead>Images</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project: any) => (
          <TableRow key={project._id}>
            <TableCell>
              <Link href={`/project/${project._id}`}>
                <Image
                  height={50}
                  width={50}
                  src={project.thumbnail}
                  alt={project.title}
                />
              </Link>
            </TableCell>
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.slug}</TableCell>
            <TableCell className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">GitHub </span>
                {project.githubUrl ? (
                  <CheckCircle2 className="text-green-500" />
                ) : (
                  <XCircle className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">Live</span>
                {project.liveUrl ? (
                  <CheckCircle2 className="text-green-500" />
                ) : (
                  <XCircle className="text-red-500" />
                )}
              </div>
            </TableCell>

            <TableCell>{project.techStacks.join(", ")}</TableCell>
            <TableCell>
              {project.images && project.images.length > 0 ? (
                <p>{project.images.length} Image Found</p>
              ) : (
                <p>No Image Uploaded!</p>
              )}
            </TableCell>

            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={`/admin/projects/${project._id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/admin/projects/${project._id}/delete`}>
                      Delete
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/products/${project.slug}/`}>View</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/admin/images/new`}>Upload Images</Link>
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

export default ProjectsTable;

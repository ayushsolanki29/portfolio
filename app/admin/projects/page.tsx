// app/admin/projects/page.tsx
import React from "react";
import PageHeader from "../_components/FileHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TechStack from "@/models/TechStack";
import ProjectsTable from "../_components/ProjectTable";
import Project from "@/models/Project";
import Image from "@/models/Image";

const ProjectsPage = async () => {
  const projects = await fetchProjectsWithTechStacks();

  return (
    <div className="container flex flex-col h-screen">
      <div className="flex justify-between">
        <PageHeader>Projects</PageHeader>
        <Link href={"/admin/projects/new"}>
          <Button size={"sm"} variant={"default"}>
            Add New Project
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <ProjectsTable projects={projects} />
      </div>
    </div>
  );
};

export default ProjectsPage;

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
      // Convert project to a plain JavaScript object
      const projectObj = project.toObject();

      // Fetch associated tech stacks
      const techStacks = await TechStack.find({
        _id: { $in: project.techStacks },
      });

      // Return a new object with plain data types
      return {
        _id: projectObj._id.toString(), // Convert ObjectId to string
        title: projectObj.title,
        description: projectObj.description,
        slug: projectObj.slug,
        thumbnail: projectObj.thumbnail,
        githubUrl: projectObj.githubUrl,
        liveUrl: projectObj.liveUrl,
        techStacks: techStacks.map((techStack) => techStack.name), // Map to array of tech stack names
        images: imagesByProjectId[projectObj._id.toString()] || [], // Use grouped images by projectId
        createdAt: projectObj.createdAt,
        updatedAt: projectObj.updatedAt,
      };
    })
  );

  return projectsWithTechStacks;
}

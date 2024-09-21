"use client"; // Keep this to ensure it's a Client Component

import React, { useEffect, useState } from "react";
import PageHeader from "../_components/FileHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectsTable from "../_components/ProjectTable";
import axios from "axios";
import toast from "react-hot-toast";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects/get");
        if (response.data.success) {
          setProjects(response.data.projects);
        } else {
          toast.error(response.data.message || "Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Error fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

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

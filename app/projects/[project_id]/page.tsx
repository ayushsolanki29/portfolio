"use client";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";
import React, { useEffect, useState } from "react";
import Icons from "../_components/Icons";
import ProjectImages from "../_components/ProjectImages";
import { notFound } from "next/navigation";
import TechStaks from "../_components/TechStaks";
import Content from "../_components/content";
import Buttons from "../_components/Buttons";
import axios from "axios";
import { Loader } from "lucide-react";

const ProjectID = ({ params }: { params: { project_id: string } }) => {
  const getParam = params.project_id; // Extract the project_id from params
  const [project, setProject] = useState<any>(null); // State for storing project data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `/api/projects/getBySlug?slug=${getParam}`
        ); // Adjust this URL based on your API
        if (response.data.success) {
          setProject(response.data.project);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        setError(error.message); // Capture error message
        return notFound(); // Call notFound to handle the 404 response
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProject();
  }, [getParam]); // Dependency on getParam

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-center h-screen flex-col w-[80%] mx-auto">
          <Loader className="animate-spin size-10" />
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message
  }

  if (!project) {
    return notFound(); // If project is still null, return not found
  }

  return (
    <div>
      <FloatingNav navItems={navItems} />
      <div className="flex items-center justify-center flex-col mt-28 w-[80%] mx-auto">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          {project.title}
        </h1>
        <br />
        <ProjectImages images={project.images} />
        <div className="flex lg:flex-row lg:justify-between mt-7 mb-3 w-full flex-col gap-3 justify-center items-center">
          <Icons iconsList={project.techStacks} />
          <Buttons project={project} />
        </div>
        <div>
          <Content text={project.content} />
          <div className="my-6 w-full overflow-y-auto">
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Tech Stacks</h2>
            <TechStaks items={project.techStacks} />
          </div>
          <div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {project.description}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectID;

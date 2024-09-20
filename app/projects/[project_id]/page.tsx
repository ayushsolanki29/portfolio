import Footer from "@/components/Footer";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";
import React from "react";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { FaChrome, FaHeadset } from "react-icons/fa6";
import { getProjectsBySlug } from "@/app/_actions/projects";

import Icons from "../_components/Icons";
import ProjectImages from "../_components/ProjectImages";
import { notFound } from "next/navigation";
import TechStaks from "../_components/TechStaks";
import Content from "../_components/content";
import Buttons from "../_components/Buttons";

const ProjectID = async ({ params }: { params: { project_id: string } }) => {
  const getParam = params.project_id;
  const project = await getProjectsBySlug(getParam);
  if (!project) {
    return notFound();
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

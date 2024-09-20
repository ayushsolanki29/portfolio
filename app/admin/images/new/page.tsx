import React from "react";
import PageHeader from "../../_components/FileHeader";
import UploadImagesForm from "../../_components/UploadImages";
import Project from "@/models/Project";

const UploadImages = async () => {
  const projects = await SelectProject();
  return (
    <div className="container flex flex-col h-screen mb-10">
      <div className="flex items-center justify-center">
        <PageHeader>Add New Project</PageHeader>
      </div>
      <UploadImagesForm projects={projects} />
    </div>
  );
};

export default UploadImages;

async function SelectProject() {
  const data = await Project.find({});
  return data.map((project) => ({ label: project.title, value: project._id }));
}

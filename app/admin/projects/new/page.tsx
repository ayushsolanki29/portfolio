import React from "react";
import PageHeader from "../../_components/FileHeader";
import ProjectForm from "../../_components/ProjectForm";
import { GetTechStackList } from "../../_actions/Techstacks";

const AddNewProject = async () => {
  const listData = await GetTechStackList();
  return (
    <div className="container flex flex-col h-full mb-10">
      <div className="flex items-center justify-center">
        <PageHeader>Add New Project</PageHeader>
      </div>
      <ProjectForm listData={listData} />
    </div>
  );
};

export default AddNewProject;

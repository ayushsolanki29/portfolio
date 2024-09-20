import React from "react";
import PageHeader from "../../_components/FileHeader";
import LanguageForm from "../../_components/LaguageForm";

const AddNewProject = () => {
  return (
    <div className="container flex flex-col h-screen mb-10">
      <div className="flex items-center justify-center">
        <PageHeader>Add New Laguage</PageHeader>
      </div>
      <LanguageForm  />
    </div>
  );
};

export default AddNewProject;

import React from "react";
import PageHeader from "../../_components/FileHeader";
import UploadImagesForm from "../../_components/UploadImages";

const UploadImages =  () => {
  return (
    <div className="container flex flex-col h-screen mb-10">
      <div className="flex items-center justify-center">
        <PageHeader>Add New Project</PageHeader>
      </div>
      <UploadImagesForm  />
    </div>
  );
};

export default UploadImages;



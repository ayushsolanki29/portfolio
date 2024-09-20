import PageHeader from "@/app/admin/_components/FileHeader";
import LanguageForm from "@/app/admin/_components/LaguageForm";
import TechStack from "@/models/TechStack";
import { notFound } from "next/navigation";
import React from "react";

const EditTech = async ({ params: { id } }: { params: { id: string } }) => {
  const language = await fetchTechStacks({ id });

  return (
    <div className="container flex flex-col h-full mb-10">
      <div className="flex items-center justify-center">
        <PageHeader>Edit Language</PageHeader>
      </div>
      <LanguageForm language={language} />
    </div>
  );
};

export default EditTech;
async function fetchTechStacks({ id }: { id: string }) {
  // Fetch the project by its ID
  const project = await TechStack.findOne({ _id: id });

  if (!project) {
    return notFound();
  }

  return {
    _id: project._id.toString(),
    name: project.name,
    role: project.role,
    image: project.image,
  };
}

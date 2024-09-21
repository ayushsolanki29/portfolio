"use client"; // Keep this to ensure it's a Client Component

import React, { useEffect, useState } from "react";
import PageHeader from "../../_components/FileHeader";
import ProjectForm from "../../_components/ProjectForm";
import axios from "axios";

const AddNewProject = () => {
  const [listData, setListData] = useState<any[]>([]); // Define correct type

  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        const response = await axios.get("/api/tech-stacks/get");
        if (response.data.success) {
          setListData(response.data.techStacks);
        } else {
          console.error("Error fetching tech stacks:", response.data.message);
        }
      } catch (error: any) {
        console.error("Error fetching tech stacks:", error.message);
      }
    };

    fetchTechStacks();
  }, []);

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

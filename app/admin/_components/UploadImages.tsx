"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UploadImagesForm = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects/getTitle");
        if (response.data.success) {
          setProjects(response.data.projects);
        } else {
          console.error("Failed to fetch projects:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as any);

    try {
      const response = await axios.post("/api/images/add", formData);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Upload failed");
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (projects.length === 0) return <p>No Project Available!</p>;

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="projectId">Select Project</Label>
        <Select name="projectId" onValueChange={setSelectedProject}>
          <SelectTrigger>
            <SelectValue placeholder="Select Project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.value} value={project.value}>
                {project.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Upload Images</Label>
        <Input type="file" id="images" name="images" multiple />
      </div>

      <Button type="submit">Upload Images</Button>
    </form>
  );
};

export default UploadImagesForm;

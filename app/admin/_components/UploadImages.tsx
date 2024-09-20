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
import React from "react";
import { useFormState } from "react-dom";
import { uploadImages } from "../_actions/Images";

const UploadImagesForm = ({ projects }: any) => {
  const [error, action] = useFormState(uploadImages, {});

  if (projects.length === 0) return <p>No Project Available!</p>;

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="thumbnail">Select Project</Label>
        <Select name="projectId">
          <SelectTrigger>
            <SelectValue placeholder="Select Project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project: any) => (
              <SelectItem key={project.value} value={project.value}>
                {project.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error?.projectId && (
          <div className="text-red-500">{error.projectId}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Upload Images</Label>
        {/* Enable multiple image upload */}
        <Input type="file" id="images" name="images" multiple />
        {error?.images && <div className="text-red-500">{error.images}</div>}
      </div>

      <Button>Upload Images</Button>
    </form>
  );
};

export default UploadImagesForm;

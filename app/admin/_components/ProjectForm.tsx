"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LaguageSelect from "./LaguageSelect";
import RichTextEditor from "../projects/_components/rich-text-editor";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProjectForm = ({
  project,
  listData,
}: {
  project?: any | null;
  listData: any;
}) => {
  const [content, setContent] = useState(project?.content || "");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [selectedFramworks, setselectedFramworks] = useState(
    project?.techStacks || []
  );
  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    description: project?.description || "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        slug: project.slug,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        description: project.description,
      });
      setContent(project.content);
      setselectedFramworks(project.techStacks);
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setThumbnail(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!thumbnail) {
      toast.error("No thumbnail image selected");
      return;
    }

    setIsLoading(true);

    try {
      // Upload thumbnail to Cloudinary (or another storage service)
      const thumbnailData = new FormData();
      thumbnailData.append("thumbnail", thumbnail);

      const uploadRes = await axios.post("/api/upload-image", thumbnailData);
      const thumbnailUrl = uploadRes.data.imageUrl;
      console.log(thumbnailUrl);
      
      // Prepare project data to send to the API
      const projectData = {
        ...formData,
        content,
        techStacks: selectedFramworks,
        thumbnail: thumbnailUrl, // Store the Cloudinary URL
      };

      // Send the project data to MongoDB
      const response = await axios.post("/api/projects/add", projectData);

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error uploading thumbnail or adding project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Enter Project Title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          type="text"
          id="slug"
          name="slug"
          placeholder="Enter Project slug for URL"
          value={formData.slug}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              type="text"
              id="liveUrl"
              name="liveUrl"
              placeholder="Enter Project Live URL"
              value={formData.liveUrl}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="githubUrl">Github URL</Label>
            <Input
              type="text"
              id="githubUrl"
              name="githubUrl"
              placeholder="Enter Project Github URL"
              value={formData.githubUrl}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter Project Short Description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <input type="hidden" name="techStacks" value={selectedFramworks} />
      <LaguageSelect
        listData={listData}
        setselectedFramworks={setselectedFramworks}
      />
      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          type="file"
          id="thumbnail"
          name="thumbnail"
          onChange={handleThumbnailChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Content</Label>
        <input type="hidden" name="content" value={content} />
        <RichTextEditor content={content} setContent={setContent} />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default ProjectForm;

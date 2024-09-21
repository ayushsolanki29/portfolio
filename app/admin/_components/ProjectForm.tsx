"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LaguageSelect from "./LaguageSelect";
import RichTextEditor from "../projects/_components/rich-text-editor";
import { useState } from "react";
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
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [selectedFramworks, setselectedFramworks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    liveUrl: "",
    githubUrl: "",
    description: "",
    
  });

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

    // Upload thumbnail to Cloudinary
    const thumbnailData = new FormData();
    thumbnailData.append("file", thumbnail);

    try {
      const uploadRes = await axios.post("/api/upload", thumbnailData);
      const thumbnailUrl = uploadRes.data.url;

      // Prepare data to send to MongoDB
      const projectData = {
        ...formData,
        content,
        techStacks: selectedFramworks,
        thumbnail: thumbnailUrl,
      };

      // Send project data to MongoDB
      const response = await axios.post("/api/projects/add", projectData);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error uploading thumbnail or adding project:", error);
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
          onChange={handleChange}
        />
      </div>
      <input type="hidden" name={"techStacks"} value={selectedFramworks} />
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
      <Button type="submit">Save</Button>
    </form>
  );
};

export default ProjectForm;

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LaguageSelect from "./LaguageSelect";
import { useFormState } from "react-dom";
import { addProject, EditProject } from "../_actions/Projects";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import RichTextEditor from "../projects/_components/rich-text-editor";
import { useState } from "react";

const ProjectForm = ({
  project,
  listData,
}: {
  project?: any | null;
  listData: any;
}) => {
  const [content, setContent] = useState(project?.content || "");
  const [error, action] = useFormState(
    project != null ? EditProject.bind(null, project._id) : addProject,
    {}
  );
  console.log(content);

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          defaultValue={project?.title}
          placeholder="Enter Project Title"
        />
        {error?.title && <div className="text-red-500">{error.title}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Slug</Label>
        <Input
          type="text"
          id="slug"
          name="slug"
          defaultValue={project?.slug}
          placeholder="Enter Project slug for URL"
        />
        {error?.slug && <div className="text-red-500">{error.slug}</div>}
      </div>
      <div className="space-y-2">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="live_URL">Live URL</Label>
            <Input
              type="text"
              id="live_URL"
              name="liveUrl"
              defaultValue={project?.liveUrl}
              placeholder="Enter Project Live URL"
            />
            {error?.liveUrl && (
              <div className="text-red-500">{error.liveUrl}</div>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="github_url">Github URL</Label>
            <Input
              type="text"
              id="github_url"
              defaultValue={project?.githubUrl}
              name="githubUrl"
              placeholder="Enter Project Github URl"
            />
            {error?.githubUrl && (
              <div className="text-red-500">{error.githubUrl}</div>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={project?.description}
          placeholder="Enter Project Short Description"
        />
        {error?.description && (
          <div className="text-red-500">{error.description}</div>
        )}
      </div>
      {/* warning message  */}
      {project && (
        <div className="text-yellow-500">
          Warning: Please Select Again Tech Stacks
        </div>
      )}

      <LaguageSelect listData={listData} />
      {error?.techStacks && (
        <div className="text-red-500">{error.techStacks}</div>
      )}
      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input type="file" id="thumbnail" name="thumbnail" />
        {error?.thumbnail && (
          <div className="text-red-500">{error.thumbnail}</div>
        )}
        {project && (
          <div className="flex gap-4">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={200}
              height={150}
            />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Content</Label>
        <input type="hidden" name="content" value={content} />
        {error?.content && <div className="text-red-500">{error.content}</div>}
        <RichTextEditor content={content} setContent={setContent} />
      </div>
      <SubmitButton />
    </form>
  );
};

export default ProjectForm;
function SubmitButton({ project }: { project?: any | null }) {
  const { pending } = useFormStatus();
  {
    if ( project != null) {
      return (
        <Button type="submit" disabled={pending}>
          {pending ? "Adding..." : "Add Project"}
        </Button>
      );
    }
    return (
      <Button type="submit" disabled={pending}>
        {pending ? "Updating..." : "Update project"}
      </Button>
    );
  }
}

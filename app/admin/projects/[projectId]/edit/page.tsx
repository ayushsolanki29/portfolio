import Project from "@/models/Project";
import TechStack from "@/models/TechStack";
import PageHeader from "@/app/admin/_components/FileHeader";
import { GetTechStackList } from "@/app/admin/_actions/Techstacks";
import ProjectForm from "@/app/admin/_components/ProjectForm";
import { notFound } from "next/navigation";

const EditProject = async ({
  params: { projectId },
}: {
  params: { projectId: string };
}) => {
  const project = await fetchProjectsWithTechStacks({ projectId });

  const listData = await GetTechStackList();
  return (
    <div className="container flex flex-col h-full mb-10">
      <div className="flex items-center justify-center">
        <PageHeader>Edit Project</PageHeader>
      </div>
      <ProjectForm listData={listData} project={project} />
    </div>
  );
};

export default EditProject;

async function fetchProjectsWithTechStacks({
  projectId,
}: {
  projectId: string;
}) {
  // Fetch the project by its ID
  const project = await Project.findOne({ _id: projectId });

  if (!project) {
    return notFound();
  }
  // Fetch associated tech stacks
  const techStacks = await TechStack.find({
    _id: { $in: project.techStacks },
  });

  // Convert the project to a plain JavaScript object and map the tech stack names
  return {
    _id: project._id.toString(),
    description: project.description,
    title: project.title,
    slug: project.slug,
    thumbnail: project.thumbnail,
    githubUrl: project.githubUrl,
    content: project.content,
    liveUrl: project.liveUrl,
    techStacks: techStacks.map((techStack) => techStack.name),
  };
}
